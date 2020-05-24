import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {ToasterComponent} from 'src/app/components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * This is to show a toaster message any where in our app
   * @param message 
   */
  createSnackBar(message: String) {
    this.snackBar.openFromComponent(ToasterComponent, {
      data: {
        message: message
      },
      duration: 3* 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    })
  }
}
