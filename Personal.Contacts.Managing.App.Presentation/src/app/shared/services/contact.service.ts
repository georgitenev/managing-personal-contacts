import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Contact } from '../models/contact';
import { environment as env } from '../../../environments/environment';

@Injectable()
export class ContactService {
  private url = `${env.webApi}/contacts`;

  constructor(private httpClient: HttpClient) {}

  getAllContacts() {
    return this.httpClient.get<Contact[]>(`${this.url}`);
  }

  getContact(id: string) {
    return this.httpClient.get<Contact>(`${this.url}/${id}`);
  }

  createContact(contact: Contact) {
    return this.httpClient.post<Contact>(`${this.url}/${contact.id}`, contact);
  }

  updateContact(contact: Contact) {
    return this.httpClient.put<Contact>(`${this.url}/${contact.id}`, contact);
  }

  deleteContact(id: string) {
    return this.httpClient.delete<boolean>(`${this.url}/${id}`);
  }
}
