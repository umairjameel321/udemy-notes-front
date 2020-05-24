import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {MatDialog} from '@angular/material';
import {ConfirmationComponent} from "src/app/components/dialogs/confirmation/confirmation.component";

import { CategoryService} from "src/app/services/common/category/category.service";
import {ConstantService} from "src/app/shared/constant/constant.service";

import { CreateCategoryDialogComponent } from 'src/app/components/dialogs/create-category-dialog/create-category-dialog.component';
import {CompilerService} from "src/app/shared/compiler/compiler.service";
import {Router} from '@angular/router';

import {ChangePasswordComponent} from "src/app/components/dialogs/change-password/change-password.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    catList: any;
    superUserId: string;
    username: string = "User";

  constructor(private breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    private compiler: CompilerService) {
      let userData = localStorage.getItem(ConstantService.localStorageKeys.userData);
      this.superUserId = JSON.parse(userData).superuserId
      this.username = JSON.parse(userData).username
    }

  clearData() {
    this.categoryService.logoutUser().subscribe(res => {
      localStorage.clear();
      this.router.navigate(["/login"]);
    })
  }

  ngOnInit() {
    this.getCategory();
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== 'cancel') {
        this.clearData();
      }
    })
  }

  openCreateCategory() {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '250px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    })
  }

  editCategory(category) {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '250px',
      disableClose: true,
      data: {
        category:category,
        isEditState: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
      this.router.navigate(['/home']);
    })
  }

  deleteCategory(category) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '250px',
      disableClose: true,
      data: {
        message: "Are you sure you want to delete?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "yes") {
        this.categoryService.deleteCategory(this.superUserId, category).subscribe(response => {
          this.getCategory();
          this.router.navigate(['/home']);
        });
      }
    })

  }

  updateState(nav) {
    this.categoryService.updateCategory(nav);
  }


  getCategory() {
    this.categoryService.getCategory(this.superUserId).subscribe((response) => {
      this.catList = this.compiler.constructCategoriesData(response);
      if(this.catList.length) {
        this.router.navigate(['/home/category', this.catList[0].id, 'notes']);
        this.updateState(this.catList[0].label);
      }
    })
  }

}
