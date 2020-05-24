import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantService} from "src/app/shared/constant/constant.service";
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiRoutes: any;
  private categoryLabel = new BehaviorSubject<any>(1);
  category = this.categoryLabel.asObservable();
  constructor(private httpClient: HttpClient,
    private constantService: ConstantService) {
      this.apiRoutes = ConstantService.apiRoutes;
     }

  logoutUser() {
    return this.httpClient.post(this.apiRoutes.logout, {});
  }

  createCategory(data) {
    return this.httpClient.post(`${this.apiRoutes.sharedApi}/${data.superuserId}/categories`, data);
  }

  editCategory(data, editCategoryId) {
    return this.httpClient.put(`${this.apiRoutes.sharedApi}/${data.superuserId}/categories/${editCategoryId}`, data);
  }

  deleteCategory(superuserId, data) {
    return this.httpClient.delete(`${this.apiRoutes.sharedApi}/${superuserId}/categories/${data.id}`);
  
  }

  updateCategory(category) {
    this.categoryLabel.next(category);
  }


  getCategory(superuserId) {
    return this.httpClient.get(`${this.apiRoutes.sharedApi}/${superuserId}/categories`);
  }
}
