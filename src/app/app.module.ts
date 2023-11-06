import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ContactComponent } from './components/contact/contact.component';
import { AlbairaqComponent } from './components/albairaq/albairaq.component';
import { LocationStrategy, Location,PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat' // we write this special code for upload img 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    ClientsComponent,
    ContactComponent,
    AlbairaqComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // {provide: LocationStrategy, useClass: PathLocationStrategy},
    // write this special code for upload img 
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
