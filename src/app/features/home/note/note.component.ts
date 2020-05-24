import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from 'src/app/shared/constant/constant.service'
import { NotesService } from 'src/app/services/common/notes/notes.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {find, findIndex} from 'lodash';

import { HelperService } from 'src/app/shared/helper/helper.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  noteFormGroup: FormGroup;
  categoryId: String;
  noteId: String;
  userData: any;
  isEditState: boolean = false;
  isNotChanged: boolean = true;
  htmlContent: '';
  note: any;
  noteList: any;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService,
    private helperService: HelperService,
    public router: Router) {
      this.userData = JSON.parse(localStorage.getItem(ConstantService.localStorageKeys.userData));
      this.activatedRoute.params.subscribe(params => {
        this.categoryId = params.categoryId
        this.getNotes();
        if(params.noteId) {
          this.noteId = params.noteId
        }
      })
     }

  ngOnInit() {
    this.noteFormGroup = this.formBuilder.group(
      {
        "title": ["", [Validators.required]]
      }
    )

    if(this.noteId) {
      this.isEditState = true;
      this.getNote();
    }
  }

  getNotes() {
    this.notesService.getNotes(this.categoryId).subscribe(response => {
      this.noteList = response;
    }, error => {

    })
  }

  getNote() {
    this.notesService.getNote(this.categoryId, this.noteId).subscribe(response => {
      this.note= response;
      this.htmlContent = this.note.content;
      this.noteFormGroup.get('title').setValue(this.note.title);
      this.noteFormGroup.get('title').updateValueAndValidity();
    })
  }

  get formValidation() {
    return this.noteFormGroup.controls;
  }

  createNote() {
    if(!this.noteFormGroup.invalid) {
      let data = {
        "title": this.noteFormGroup.value.title,
        "content": this.htmlContent,
        "updated_at": new Date(),
        "superuserId": this.userData.superuserId,
        "appuserId": this.userData.appuserId
      }

      let exists = find(this.noteList, function(obj) {
        return obj.title.replace(/ /g, '').toLowerCase() == data.title.replace(/ /g, '').toLowerCase()
      })

      if(!exists) {
        this.notesService.createNote(data, this.categoryId).subscribe(response=> {
          this.router.navigate(['/home/category', this.categoryId, 'notes']);
        })
      } else {
        this.helperService.createSnackBar(
          ConstantService.errorMessages.noteExists
        )
      }
      
    }
  }

  editNote() {
    if(!this.noteFormGroup.invalid) {
      this.note.title = this.noteFormGroup.value.title;
      this.note.content = this.htmlContent;
      let self = this;
      let noteIndex = findIndex(this.noteList, function(obj){
        return obj.id == self.note.id
      });

      let exists = find(this.noteList, function(obj, index) {
        if(index !== noteIndex)
          return obj.title.replace(/ /g, '').toLowerCase() == self.note.title.replace(/ /g, '').toLowerCase()
      })

      if(!exists) {
        this.notesService.editNote(this.note).subscribe(response=> {
          this.router.navigate(['/home/category', this.categoryId, 'notes']);
        })
      } else {
        this.helperService.createSnackBar(
          ConstantService.errorMessages.noteExists
        )
      }
      
    }
  }

}
