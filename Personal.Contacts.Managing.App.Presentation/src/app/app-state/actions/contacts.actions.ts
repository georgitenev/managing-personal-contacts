import { createAction, props } from "@ngrx/store";
import { Contact } from "../../shared/models/contact";
import { CONTACTS_TYPES } from "../types/contacts.type";

export const getAllContacts = createAction(CONTACTS_TYPES.GET_ALL_CONTACTS,
    props<any>());

export const getAllContactsSuccess = createAction(CONTACTS_TYPES.GET_ALL_CONTACTS_SUCCESS,
    props<{ contacts: Contact[] }>());

export const getContact = createAction(CONTACTS_TYPES.GET_CONTACT,
    props<{ contactId: string }>());

export const getContactSuccess = createAction(CONTACTS_TYPES.GET_CONTACT_SUCCESS,
    props<{ contact: Contact }>());

export const createContact = createAction(CONTACTS_TYPES.CREATE_CONTACT,
    props<{ contact: Contact }>());

export const createContactSuccess = createAction(CONTACTS_TYPES.CREATE_CONTACT_SUCCESS,
    props<{ contact: Contact | null, isSuccess: boolean }>());

export const updateContact = createAction(CONTACTS_TYPES.UPDATE_CONTACT,
    props<{ contact: Contact }>());

export const updateContactSuccess = createAction(CONTACTS_TYPES.UPDATE_CONTACT_SUCCESS,
    props<{ contact: Contact | null, isSuccess: boolean }>());

export const deleteContact = createAction(CONTACTS_TYPES.DELETE_CONTACT,
    props<{ contactId: string }>());

export const deleteContactSuccess = createAction(CONTACTS_TYPES.DELETE_CONTACT_SUCCESS,
    props<{ result: boolean }>());

export const setErrorMessage = createAction(CONTACTS_TYPES.ON_FAILURE,
    props<{ errorMessage: string | null }>());