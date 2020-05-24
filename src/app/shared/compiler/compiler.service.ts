import { Injectable } from '@angular/core';

import {RegisterUser} from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor() { }

  constructRegisterUserObject(userData: RegisterUser) {
    let modifiedData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }

    return modifiedData;
  }

  constructLoginUserObject(userData) {
    let modifiedData = {
      email: userData.email,
      password: userData.password
    }

    return modifiedData;
  }

  constructAfterLoginUserData(loginApiResponse) {
    let loginData = {
      userId: loginApiResponse.userId,
      superuserId: loginApiResponse.superuserId,
      username: loginApiResponse.superuser.username
    }
    return loginData;
  }

  constructCategoriesData(data) {
    let newArray = []
    data.forEach(element => {
      newArray.push({
        icon: 'folder',
        path: '/home/category',
        label: element.name,
        id: element.id,
        description: element.description
      })
    })
    return newArray;
  }

  constructChangePassword(data) {
    let changePassword = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }
    return changePassword;
  }
}
