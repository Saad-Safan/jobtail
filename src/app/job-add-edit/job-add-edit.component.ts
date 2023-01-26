
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';


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

  getSub(): Observable<string> {
    var subject = new Subject<string>();
    // Token
    this.auth.idTokenClaims$.subscribe((val) => {
      if (val) {
        this.sub = val['sub'];
        subject.next(this.sub);
      }
    });

    return subject.asObservable();
  }

  ngOnInit(): void {
    this.sub = this.getSub();
    this.empForm.patchValue(this.data);
  }

  sub: any = null;

  onFormSubmit() {
    this.sub = this.getSub();
    if (this.empForm.valid) {
      console.log(this.empForm.value);

      

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

      this.getSub().subscribe((val) => {
        // Make an API call to add or update the user's job
      console.log(val)
      axios.post("http://localhost:3000/api/jobs/addJob/" + val, body)
      });

      // Close the component
      this._dialogRef.close(true);

      this.auth.loginWithRedirect({
        appState: {
          target: 'http://localhost:4200/dashboard',
        },
        authorizationParams: {
          redirect_uri: 'http://localhost:4200/dashboard',
        }
      });

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
