import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { ContactService } from "../../shared/services/contact.service";
import * as contactsActions from "../actions/contacts.actions";
import { selectContactsState } from "../selectors/contacts.selector";


@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private store: Store
  ) { }

  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.getAllContacts),
    withLatestFrom(this.store.select(selectContactsState)),
    mergeMap(([action, latest]) => {
      return this.contactService.getAllContacts()
        .pipe(
          map(contacts => (contactsActions.getAllContactsSuccess({ contacts }))),
          catchError(() => of(contactsActions.setErrorMessage({ errorMessage: 'Get contacts failed' })))
        )
    })
  )
  );

  getContact$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.getContact),
    withLatestFrom(this.store.select(selectContactsState)),
    mergeMap(([action, latest]) => {
      return this.contactService.getContact(latest.contactId!)
        .pipe(
          map(contact => (contactsActions.getContactSuccess({ contact }))),
          catchError(() => of(contactsActions.setErrorMessage({ errorMessage: 'Get contact failed' })))
        )
    })
  )
  );

  createContact$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.createContact),
    withLatestFrom(this.store.select(selectContactsState)),
    mergeMap(([action, latest]) => {
      return this.contactService.createContact(latest.contact!)
        .pipe(
          map((contact) => (contactsActions.createContactSuccess({ contact, isSuccess: true }))),
          catchError(() => of(contactsActions.setErrorMessage({ errorMessage: 'Create contact failed' })))
        )
    })
  )
  );

  updateContact$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.updateContact),
    withLatestFrom(this.store.select(selectContactsState)),
    mergeMap(([action, latest]) => {
      return this.contactService.updateContact(latest.contact!)
        .pipe(
          map((contact) => (contactsActions.updateContactSuccess({ contact, isSuccess: true }))),
          catchError(() => of(contactsActions.setErrorMessage({ errorMessage: 'Update contact failed' })))
        )
    })
  )
  );

  deleteContact$ = createEffect(() => this.actions$.pipe(
    ofType(contactsActions.deleteContact),
    withLatestFrom(this.store.select(selectContactsState)),
    mergeMap(([action, latest]) => {
      return this.contactService.deleteContact(latest.contactId!)
        .pipe(
          map((isSuccess) => (contactsActions.deleteContactSuccess({ result: isSuccess }))),
          catchError(() => of(contactsActions.setErrorMessage({ errorMessage: 'Delete contact failed' })))
        )
    })
  )
  );
}