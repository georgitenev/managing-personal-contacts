import { Component } from '@angular/core';
import { ContactService } from '../../shared/services/contact.service';
import { Contact } from '../../shared/models/contact';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import * as contactsActions from '../../app-state/actions/contacts.actions';
import { selectContactsState } from '../../app-state/selectors/contacts.selector';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ContactsViewComponent {

  public contacts: Contact[] = [];

  constructor(
    private router: Router,
    private contactService: ContactService,
    private messageService: MessageService,
    private store: Store,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    // this.contactService.getAllContacts().subscribe(data => this.contacts = data);
    this.loadContacts();
    this.subscribeForCurrentState();
  }

  public loadContacts(): void {
    this.store.dispatch(contactsActions.getAllContacts({}));
  }

  createContact() {
    this.router.navigateByUrl('contacts-view/contact');
  }

  private subscribeForCurrentState(): void {
    this.store.select(selectContactsState).subscribe(state => {
      this.contacts = state.contacts!;

      if (state.isDeleteSuccessful) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact was deleted sucessfully!' });
        this.store.dispatch(contactsActions.deleteContactSuccess({ result: false }));
        this.loadContacts();
      }
      if (!state.isDeleteSuccessful && state.errorMessage) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to delete contact' });
        this.store.dispatch(contactsActions.deleteContactSuccess({ result: false }));
        this.store.dispatch(contactsActions.setErrorMessage({ errorMessage: null }));
      }
    });
  }

  editContact(id: string) {
    this.router.navigateByUrl(`contacts-view/contact/${id}`);
  }

  deleteContact(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this contact?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(contactsActions.deleteContact({ contactId: id }));
        // this.contactService.deleteContact(id).subscribe(result => {
        //   if (result) {
        //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact deleted' });
        //   }
        //   else {
        //     this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Contact cant be deleted' });
        //   }
        // },
        //   error => {
        //     this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Something went wrong' });
        //   });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
