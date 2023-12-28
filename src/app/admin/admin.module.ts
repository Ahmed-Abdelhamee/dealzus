import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeClientsComponent } from './home-clients/home-clients.component';
import { ClientsComponent } from './clients/clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPhotoStyleDirectiveDirective } from './directives/admin-photo-style-directive.directive';
import { AdminLoadingStyleDirectiveDirective } from './directives/admin-loading-style-directive.directive';
import { AdminButtonDirectiveDirective } from './directives/admin-button-directive.directive';
import { ShowDataDiveDirectiveDirective } from './directives/show-data-dive-directive.directive';
import { DeleteElementDivDirective } from './directives/delete-element-div.directive';
import { AdminPromoImageDirective } from './directives/admin-promo-image.directive';
import { HomeServciesComponent } from './home-servcies/home-servcies.component';


@NgModule({
  declarations: [
    HomeClientsComponent,
    ClientsComponent,
    AdminPhotoStyleDirectiveDirective,
    AdminLoadingStyleDirectiveDirective,
    AdminButtonDirectiveDirective,
    ShowDataDiveDirectiveDirective,
    DeleteElementDivDirective,
    AdminPromoImageDirective,
    HomeServciesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
