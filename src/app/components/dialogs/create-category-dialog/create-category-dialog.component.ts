import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ConstantService} from "src/app/shared/constant/constant.service";
import {CategoryService} from "src/app/services/common/category/category.service";
import {CompilerService} from "src/app/shared/compiler/compiler.service";
import {find} from 'lodash';
import {HelperService} from 'src/app/shared/helper/helper.service';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent implements OnInit {
  createCategoryFormGroup: FormGroup;
  superUserId: string;
  categoryList: any;
  editCategoryId: string;
  isEditState: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private helperService: HelperService,
    private compiler: CompilerService,
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      let  userData = localStorage.getItem(ConstantService.localStorageKeys.userData);
      this.superUserId = JSON.parse(userData).superuserId
      this.getCategory();
     }

  ngOnInit() {
    this.createCategoryFormGroup = this.formBuilder.group(
      {
        "name": ["", [Validators.required]]
      }
    )
    if(this.data && this.data.isEditState) {
      this.isEditState = this.data.isEditState;
      this.createCategoryFormGroup.get('name').setValue(this.data.category.label);
      this.createCategoryFormGroup.get('name').updateValueAndValidity();
      this.editCategoryId = this.data.category.id;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createCategory() {
    if(!this.createCategoryFormGroup.invalid) {
      let self = this;
      let exist = find(this.categoryList, function(obj) {
        return obj.label.replace(/ /g, '').toLowerCase() == self.createCategoryFormGroup.value.name.replace(/ /g, '').toLowerCase()
      })
      if(!exist) {
        this.createCategoryFormGroup.value.superuserId = this.superUserId;
        this.categoryService.createCategory(this.createCategoryFormGroup.value).subscribe((response)=> {
          this.onNoClick();
        })
      } else {
        this.helperService.createSnackBar(
          ConstantService.errorMessages.categoryExists
        )
      }
    }
  }

  editCategory() {
    if(!this.createCategoryFormGroup.invalid) {
      this.createCategoryFormGroup.value.superuserId = this.superUserId;
      let self = this;
      let exist = find(this.categoryList, function(obj) {
        return obj.label.replace(/ /g, '').toLowerCase() == self.createCategoryFormGroup.value.name.replace(/ /g, '').toLowerCase()
      })
      if(!exist) {
        this.categoryService.editCategory(this.createCategoryFormGroup.value, this.editCategoryId).subscribe((response)=> {
          this.onNoClick();
        })
      } else {
        this.helperService.createSnackBar(
          ConstantService.errorMessages.categoryExists
        )
      }
    }
  }

  getCategory() {
    this.categoryService.getCategory(this.superUserId).subscribe((response) => {
      this.categoryList = this.compiler.constructCategoriesData(response);
    })
  }

}
