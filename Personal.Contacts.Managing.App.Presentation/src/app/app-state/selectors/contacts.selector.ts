import { ContactsState } from "../reducers/contacts.reducers";

export const selectContactsState = (state: any) => state['contactsState'] as ContactsState;