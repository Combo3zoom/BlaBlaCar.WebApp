import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { PublisherTripComponent } from './publisher-trip/publisher-trip.component';
import { FoundTripComponent } from './found-trip/found-trip.component';
import { AdminComponent } from './admin_d/admin/admin.component';
import {MatListModule} from "@angular/material/list";
import {MatLegacyListModule} from "@angular/material/legacy-list";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {TripService} from "./services/trip.service";
import {CommonModule} from "@angular/common";
import {UserService} from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PublisherTripComponent,
    FoundTripComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatLegacyListModule,
    HttpClientModule,
  ],
  providers: [AuthService, TripService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
