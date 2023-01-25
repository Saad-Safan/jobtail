
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';


@Component({
  selector: 'app-job-add-edit',
  templateUrl: './job-add-edit.component.html',
  styleUrls: ['./job-add-edit.component.css']
})
export class JobAddEditComponent {
  empForm: FormGroup;

  status: string[] = [
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
    
    public auth: AuthService
  ) {
    this.empForm = this._fb.group({
      company: '',
      title: '',
      description: '',
      status: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  sub: any = null;

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);

      // Get sub from token converted to string
      this.sub = this.auth.idTokenClaims$.subscribe((val) => {
        this.sub = val?['sub'] : null
      });

      if (!this.sub) {
        return;
      }

      this.sub = this.sub.toString();

      // Make an API call to add or update the user's job
      // Use a custom body object
      const body = {
        jobs : {
          company: this.empForm.value.company,
          title: this.empForm.value.title,
          description: this.empForm.value.description,
          status: this.empForm.value.status,
        }
      };

      // Make an API call to add or update the user's job
      axios.post(`http://localhost:3000/api/jobs/addJob/${"Marawan"}`, body)

      // Close the component
      this._dialogRef.close(true);

      // Reload the page
      window.location.reload();

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
