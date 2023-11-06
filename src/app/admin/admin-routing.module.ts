import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeClientsComponent } from './home-clients/home-clients.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {path:"admin",component:AdminComponent ,children:[
  {path:"home-clients",component:HomeClientsComponent},
  {path:"clients",component:ClientsComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
