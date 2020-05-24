import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {CategoryService} from "src/app/services/common/category/category.service";
import { Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { NotesService } from 'src/app/services/common/notes/notes.service';
import { ConfirmationComponent } from 'src/app/components/dialogs/confirmation/confirmation.component';

export interface noteList {
  appuserId: string;
  categoriesId: string;
  content: string;
  id: string;
  superuserId: string;
  title: string;
  updated_at: string;
}


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<noteList>([])

  @ViewChild(MatPaginator) paginator: MatPaginator;
  noteList: any = [];
  categoryName: string;
  subscription: Subscription;
  categoryId: any;
  constructor(private categoryService: CategoryService,
    private router: Router, 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notesService: NotesService) {
    
      this.route.params.subscribe(params => {
        this.categoryId = params['id'];
        this.getNotes();
      })
    this.subscription = this.categoryService.category.subscribe(res => {
      if(res!=1) {
        this.categoryName = res;
      }
    });
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createNote() {
    this.router.navigate(['/home/category', this.categoryId, 'note'])
  }


  getNotes() {
    this.notesService.getNotes(this.categoryId).subscribe(response => {
      this.noteList = response;
      this.dataSource = new MatTableDataSource<noteList>(
        this.noteList
      );
      this.dataSource.paginator = this.paginator;
    })
  }

  viewNote(note) {
    this.router.navigate(['/home/category', note.categoriesId, 'note', note.id]);
  }

  deleteNote(note) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '250px',
      disableClose: true,
      data: {
        message: "Are you sure you want to delete?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "yes") {
        this.notesService.deleteNote(note.categoriesId, note.id).subscribe(response => {
          this.getNotes();
        });
      }
    })

  }

}
