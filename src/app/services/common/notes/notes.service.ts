import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantService} from "src/app/shared/constant/constant.service";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  apiRoutes: any;
  constructor(private httpClient: HttpClient,
    ) {
      this.apiRoutes = ConstantService.apiRoutes;
     }


     createNote(data, CategoryId) {
      return this.httpClient.post(`${this.apiRoutes.categories}/${CategoryId}/notes`, data);
     }

     getNotes(CategoryId) {
      return this.httpClient.get(`${this.apiRoutes.categories}/${CategoryId}/notes`);
     }


     getNote(CategoryId, NoteId) {
      return this.httpClient.get(`${this.apiRoutes.categories}/${CategoryId}/notes/${NoteId}`);
     }

     editNote(data) {
      return this.httpClient.put(`${this.apiRoutes.categories}/${data.categoriesId}/notes/${data.id}`, data);
     }

     deleteNote(CategoryId, NoteId) {
       return this.httpClient.delete(`${this.apiRoutes.categories}/${CategoryId}/notes/${NoteId}`)
     }
}
