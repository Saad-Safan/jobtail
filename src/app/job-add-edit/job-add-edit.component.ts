
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-job-add-edit',
  templateUrl: './job-add-edit.component.html',
  styleUrls: ['./job-add-edit.component.css']
})
export class JobAddEditComponent {
  empForm: FormGroup;

  Status: string[] = [
    'Wishlist',
    'Applied',
    'Interview',
    'Declined',
    'Offer',
  ];

  constructor(
    private _fb: FormBuilder,
    
    private _dialogRef: MatDialogRef<JobAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.empForm = this._fb.group({
      company: '',
      Title: '',
      Description: '',
      Status: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
    //   if (this.data) {
    //     this._empService
    //       .updateEmployee(this.data.id, this.empForm.value)
    //       .subscribe({
    //         next: (val: any) => {
    //           this._coreService.openSnackBar('Employee detail updated!');
    //           this._dialogRef.close(true);
    //         },
    //         error: (err: any) => {
    //           console.error(err);
    //         },
    //       });
    //   } else {
    //     this._empService.addEmployee(this.empForm.value).subscribe({
    //       next: (val: any) => {
    //         this._coreService.openSnackBar('Employee added successfully');
    //         this._dialogRef.close(true);
    //       },
    //       error: (err: any) => {
    //         console.error(err);
    //       },
    //     });
    //   }
    }
  }
}
