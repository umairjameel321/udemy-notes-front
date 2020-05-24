import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthService} from 'src/app/services/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(this.auth.getToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`,
          'Content-Type': 'application/json'
        }
      })
    }
    return next.handle(req);
  }


}
