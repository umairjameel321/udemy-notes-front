import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginregisterRoutingModule } from './loginregister-routing.module';
import {MaterialModule} from 'src/app/shared/module/material/material.module';

import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "src/app/services/core/interceptors/token-interceptor.service";
import {AuthGuardService} from "src/app/services/core/guards/auth-guard.service";
import {AuthService} from "src/app/services/core/auth/auth.service";

import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    VerificationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginregisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class LoginregisterModule { }
