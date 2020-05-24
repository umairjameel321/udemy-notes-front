import { Injectable } from '@angular/core';
import {ConstantService} from 'src/app/shared/constant/constant.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storageKey = ConstantService.localStorageKeys.token;
  userDataKey = ConstantService.localStorageKeys.userData;
  logout_success: string;
  logout_msg: string;

  constructor(private router: Router) { }

  /**
   * This function is used to logout a user and navigate to login page
   */
  logoutUser() {
    localStorage.clear();
    this.removeToken();

    this.router.navigate(['/login'])
  }

  /**
   * this function is used to get the token key that the user gets when he logs in.
   */
  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  /**
   * this function is used to set the Token key when the user logs in,
   * @param token #string
   */
  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  /**
   * This is used to remove token from local stroage
   */
  removeToken() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.userDataKey);
  }

  /**
   * this fucntion only tells that if the user has been assigned any token then return true other wise return false
   * this function was using for header to change the login button to logout because we applied *ngIf there that checks
   * that if this function return true thrn logout will be shown on the header otherwise login and register buttons will
   * be shown.
   */
  isAuthenticated(): boolean {
    if (this.getToken()) {
        return true;
    }
    return false;
  }
}
