import { createReducer, on } from "@ngrx/store";
import { Contact } from "../../shared/models/contact";
import * as contactsActions from "../actions/contacts.actions";


export interface ContactsState {
    contacts: Contact[] | null;
    contact: Contact | null;
    contactId: string | null;
    isCreateSuccessful: boolean;
    isUpdateSuccessful: boolean;
    isDeleteSuccessful: boolean;
    errorMessage: string | null;
}

export const initialState: ContactsState = {
    contacts: null,
    contact: null,
    contactId: null,
    isCreateSuccessful: false,
    isUpdateSuccessful: false,
    isDeleteSuccessful: false,
    errorMessage: null,
}

export const contactsReducer = createReducer(
    initialState,
    on(contactsActions.getAllContacts, (state, { }) => ({ ...state })),
    on(contactsActions.getAllContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
    on(contactsActions.getContact, (state, { contactId }) => ({ ...state, contactId })),
    on(contactsActions.getContactSuccess, (state, { contact }) => ({ ...state, contact })),
    on(contactsActions.createContact, (state, { contact }) => ({ ...state, contact })),
    on(contactsActions.createContactSuccess, (state, { contact, isSuccess }) => ({ ...state, contact, isCreateSuccessful: isSuccess })),
    on(contactsActions.setErrorMessage, (state, { errorMessage }) => ({ ...state, errorMessage })),
    on(contactsActions.updateContact, (state, { contact }) => ({ ...state, contact })),
    on(contactsActions.updateContactSuccess, (state, { contact, isSuccess }) => ({ ...state, contact, isUpdateSuccessful: isSuccess })),
    on(contactsActions.deleteContact, (state, { contactId }) => ({ ...state, contactId })),
    on(contactsActions.deleteContactSuccess, (state, { result }) => ({ ...state, isDeleteSuccessful: result })),
);