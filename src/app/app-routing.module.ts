import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {PublisherTripComponent} from "./publisher-trip/publisher-trip.component";
import {FoundTripComponent} from "./found-trip/found-trip.component";
import {AdminComponent} from "./admin_d/admin/admin.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'publisher-trip', component: PublisherTripComponent},
  { path: 'found-trip', component: FoundTripComponent},
  { path: 'admin', component: AdminComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
