import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantService} from "src/app/shared/constant/constant.service";
import {RegisterUser, RegisterUserResponse, LoginUser, LoginResponse} from "src/app/models/user.model";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginregisterService {
  apiRoutes: any;

  constructor(private httpClient: HttpClient,
    private constanctService: ConstantService) {
      this.apiRoutes = ConstantService.apiRoutes;
     }


  /**
   * THis is used to register new user
   * @param userData 
   */
  registerUser(userData: RegisterUser): Observable<RegisterUserResponse>  {
    return this.httpClient.post<RegisterUserResponse>(this.apiRoutes.signup, userData);
  }

  loginUser (userData: LoginUser) : Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.apiRoutes.login, userData);
  }

  resendEmail(data: any) {
    return this.httpClient.post(this.apiRoutes.sendverifyemail, data);
  }

  forgetPassword(data: any) {
    return this.httpClient.post(this.apiRoutes.forgotPassword, data);
  }

  resetPassword(data: any) {
    return this.httpClient.post(this.apiRoutes.resetPassword, {user: data});
  }

  changePassword(data) {
    return this.httpClient.post(`${this.apiRoutes.signup}/change-password`, data);
  }


}
