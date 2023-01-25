import { JobAddEditComponent } from './job-add-edit/job-add-edit.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jobtail';

  constructor(private _dialog: MatDialog) { }
   openAddEditJobForm() {
    this._dialog.open(JobAddEditComponent);
  }
   
}
 

