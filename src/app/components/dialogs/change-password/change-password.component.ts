import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompilerService } from 'src/app/shared/compiler/compiler.service';
import { ConstantService } from '../../../shared/constant/constant.service'
import { MatDialogRef } from '@angular/material';
import { HelperService } from 'src/app/shared/helper/helper.service';
import {LoginregisterService} from "src/app/services/common/loginregister/loginregister.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginregisterService: LoginregisterService,
    private compilerService: CompilerService,
    private helperService: HelperService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
  ) { }

  ngOnInit() {
    this.changePasswordFormGroup = this.formBuilder.group(
      {
        "oldPassword": ["", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)]
        ],
        "newPassword": ["", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)]
        ],
        "confirmPassword": ["", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)]
        ],
      }, {
        validator: this.checkPasswords
      }
    )
  }


  checkPasswords(group: FormGroup) {
    const oldPass = group.controls.oldPassword.value;
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    if(oldPass == pass) {
      return group.controls.newPassword.setErrors({same: true})
    } else {
      return pass === confirmPass ? null : group.controls.confirmPassword.setErrors({notSame: true})
    }

  }

  onNoClick() {
    this.dialogRef.close();
  }


  changePassword() {
    if(!this.changePasswordFormGroup.invalid) {
      let data =this.compilerService.constructChangePassword(this.changePasswordFormGroup.value)
      this.loginregisterService.changePassword(data).subscribe(response => {
        this.helperService.createSnackBar(
          ConstantService.successMessages.changePassword
        )

        this.onNoClick();
      }, error => {
        this.helperService.createSnackBar(
          ConstantService.errorMessages.currentPassword
        )
      })
    }
  }

}
