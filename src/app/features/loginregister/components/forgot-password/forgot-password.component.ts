import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { LoginregisterService } from 'src/app/services/common/loginregister/loginregister.service';
import {HelperService} from 'src/app/shared/helper/helper.service';
import {ConstantService} from 'src/app/shared/constant/constant.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private loginRegisterService: LoginregisterService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.forgotPassForm = this.formBuilder.group(
      {
        "email": ["", [Validators.required,
                      Validators.email]]
      }
    )
  }
  
  forgetPassword() {
   if(!this.forgotPassForm.invalid) {
     this.loginRegisterService.forgetPassword(this.forgotPassForm.value).subscribe((data) => {
      this.helperService.createSnackBar(ConstantService.errorMessages.checkEmail);
     }, (error) => {
       
     })
   }
  }

}
