import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Contact } from 'src/app/shared/models/contact';
import { ContactService } from 'src/app/shared/services/contact.service';
import * as contactsActions from '../../app-state/actions/contacts.actions';
import { ContactsState } from '../../app-state/reducers/contacts.reducers';
import { selectContactsState } from '../../app-state/selectors/contacts.selector';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ContactComponent {
  public displayModal: boolean = false;

  public contact: Contact = {
    id: '',
    firstName: '',
    surname: '',
    dateOfBirth: new Date(),
    address: '',
    phoneNumber: '',
    iban: '',
  };

  public form = new FormGroup({
    firstName: new FormControl(this.contact.firstName, Validators.required),
    surname: new FormControl(this.contact.surname, Validators.required),
    dateOfBirth: new FormControl(this.contact.dateOfBirth, Validators.required),
    address: new FormControl(this.contact.address, Validators.required),
    phoneNumber: new FormControl(this.contact.phoneNumber, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    iban: new FormControl(this.contact.iban, [
      Validators.required,
      Validators.minLength(22),
      Validators.maxLength(22),
    ]),
  });

  constructor(
    private store: Store<{ state: ContactsState }>,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadContact(params['id']);
        // this.contactService.getContact(params['id']).subscribe(data => {
        //   data.dateOfBirth = new Date(data.dateOfBirth);
        //   this.contact = data;
        // });
      }
      this.subscribeForCurrentState();
    });
  }

  private loadContact(contactId: string): void {
    this.store.dispatch(contactsActions.getContact({ contactId }));
  }

  private subscribeForCurrentState(): void {
    this.store.select(selectContactsState).subscribe((state) => {
      if (state.contact) {
        this.contact = {
          id: state.contact.id,
          firstName: state.contact.firstName,
          surname: state.contact.surname,
          dateOfBirth: new Date(state.contact.dateOfBirth),
          address: state.contact.address,
          phoneNumber: state.contact.phoneNumber,
          iban: state.contact.iban,
        };
      }

      if (state.errorMessage) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: state.errorMessage,
        });
        this.store.dispatch(
          contactsActions.setErrorMessage({ errorMessage: null })
        );
      }

      if (state.contactId && state.isCreateSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contact created sucessfully!',
        });
        this.store.dispatch(
          contactsActions.createContactSuccess({ contact: null, result: false })
        );
        this.store.dispatch(
          contactsActions.setErrorMessage({ errorMessage: null })
        );
        this.router.navigate(['contacts-view']);
      }

      if (state.contactId && state.contact && state.isUpdateSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Contact updated sucessfully!',
        });
        this.store.dispatch(
          contactsActions.updateContactSuccess({ contact: null, result: false })
        );
        this.store.dispatch(
          contactsActions.setErrorMessage({ errorMessage: null })
        );
        this.router.navigate(['contacts-view']);
      }
    });
  }

  onBack() {
    this.store.dispatch(
      contactsActions.createContactSuccess({ contact: null, result: false })
    );
    this.store.dispatch(
      contactsActions.updateContactSuccess({ contact: null, result: false })
    );
    this.router.navigateByUrl('contacts-view');
  }

  onSubmit() {
    console.log('contact', this.contact);
    if (this.form.valid) {
      if (this.contact.id) {
        // this.updateContact();
        this.store.dispatch(
          contactsActions.updateContact({ contact: this.contact })
        );
      } else {
        // this.createContact();
        this.store.dispatch(
          contactsActions.createContact({ contact: this.contact })
        );
      }
    } else {
      this.displayModal = true;
    }
  }

  // updateContact() {
  //   this.contactService.updateContact(this.contact).subscribe(data => {
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact updated' });
  //   },
  //   errorResponse => {
  //     this.messageService.add({ severity: 'error', summary: 'Contact could not be updated', detail: errorResponse.error });
  //   });
  // }

  // createContact() {
  //   this.contactService.createContact(this.contact).subscribe(data => {
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact created' });
  //   },
  //   errorResponse => {
  //     this.messageService.add({ severity: 'error', summary: 'Contact could not be created', detail: errorResponse.error });
  //   });
  // }
}
