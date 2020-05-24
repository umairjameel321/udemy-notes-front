import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  static apiRoutes = {
    login: `${environment.apiUrl}/appusers/login`,
    signup: `${environment.apiUrl}/appusers`,
    sendverifyemail: `${environment.apiUrl}/appusers/sendEmail`,
    forgotPassword: `${environment.apiUrl}/appusers/reset`,
    resetPassword: `${environment.apiUrl}/appusers/updateForgetPassword`,
    logout: `${environment.apiUrl}/appusers/logout`,
    sharedApi: `${environment.apiUrl}/superusers`,
    categories: `${environment.apiUrl}/categories`
  }

  static apiMethod = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
  }

  static localStorageKeys = {
    token: 'User_Token',
    userData: 'User_Data'
  }

  static errorMessages = {
    noEmailExist: "Invalid Information",
    unknownError: "Unknown Error, Please try again",
    formError: "Form Error",
    checkEmail: "Email is sent to you",
    categoryExists: "Category with same name exists",
    noteExists: "Note with same title exists",
    notVerified: "Email not verified",
    currentPassword: "Invalid current password",
    alreadyExists: "Username or Email already exists"
  }


  static successMessages = {
    userLoggedIn: "User has logged in",
    changePassword: "Your password has been changed"
  }
}
