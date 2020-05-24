import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '', component: CategoryComponent,
    children: [
      {path: 'category/:id/notes', component: NotesComponent},
      {path: 'category/:categoryId/note', component: NoteComponent},
      {path: 'category/:categoryId/note/:noteId', component: NoteComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
