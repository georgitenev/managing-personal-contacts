import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContactService } from './shared/services/contact.service';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';

import { ContactsViewComponent } from './components/contacts-view/contacts-view.component';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

// ngrx related imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { contactsReducer } from './app-state/reducers/contacts.reducers';
import { ContactsEffects } from './app-state/effects/contacts.effects';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    MessagesModule,
    ConfirmDialogModule,
    PanelModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // ngrx related imports
    StoreModule.forRoot({ contactsState: contactsReducer }),
    EffectsModule.forRoot([ContactsEffects]),

    RouterModule.forRoot([
      { path: 'contacts-view', component: ContactsViewComponent },
      { path: 'contacts-view/contact', component: ContactComponent },
      { path: 'contacts-view/contact/:id', component: ContactComponent },
      { path: '', redirectTo: '/contacts-view', pathMatch: 'full' },
    ]),
  ],
  declarations: [AppComponent, ContactsViewComponent, ContactComponent],
  bootstrap: [AppComponent],
  providers: [ContactService],
})
export class AppModule {}
