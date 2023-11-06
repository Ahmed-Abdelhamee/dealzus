import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AlbairaqComponent } from './components/albairaq/albairaq.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"services",component:ServicesComponent},
  {path:"clients",component:ClientsComponent},
  {path:"albairaq",component:AlbairaqComponent},
  {path:"contact",component:ContactComponent},
  {path:"admin",component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
