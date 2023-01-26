import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAddEditComponent } from 'src/app/job-add-edit/job-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  sub : any = null;
  jobs : any[] = [];
  user$ = this.auth.user$;
  wishlistJobs: any[] = [];
  appliedJobs: any[] = [];
  interviewJobs: any[] = [];
  offerJobs: any[] = [];
  declinedJobs: any[] = [];

  constructor(private _dialog: MatDialog, public auth: AuthService, private modalService: NgbModal, @Inject(DOCUMENT) private doc: Document, public router: Router) {
    this.modalService = modalService;
  }

  

   openAddEditJobForm() {
    this._dialog.open(JobAddEditComponent);
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
    this.getSub().subscribe((val) => {
      // Try and find user in DB
    axios.get('http://localhost:3000/api/jobs/getOne/' + val ).then((res) => {
      // If user found, get jobs
      this.jobs = res.data[0].jobs;
      this.updateJobs(this.jobs);
    }).catch((err) => {
        // If user not found, create new user
        axios.post('http://localhost:3000/api/jobs/addUser', { user: val }).then((res) => {
          console.log(val)
          axios.get('http://localhost:3000/api/jobs/getOne/' + val ).then((res) => {
            this.jobs = res.data[0].jobs;
            this.updateJobs(this.jobs);
          }).catch((err) => {
            // If user not found, error
            console.log("user not found", err);
          });
        }).catch((err) => {
          // If user not created, error
          console.log("user not created", err);
        });
      });
    });
  }

  updateJobs(jobs: any[]): void {
    for (let i = 0; i < jobs.length; i++) {
      switch (jobs[i].status) {
        case "Wishlist":
          this.wishlistJobs.push(jobs[i]);
          break;
        case "Applied":
          this.appliedJobs.push(jobs[i]);
          break;
        case "Interview":
          this.interviewJobs.push(jobs[i]);
          break;
        case "Offer":
          this.offerJobs.push(jobs[i]);
          break;
        case "Declined":
          this.declinedJobs.push(jobs[i]);
          break;
        default:
          break;
      }
    }
  }

  deleteTask(job: any): void {
    // Remove job from user's jobs
    this.getSub().subscribe((val) => {
      axios.post('http://localhost:3000/api/jobs/deleteJob/' + val, { jobs: job }).then((res) => {
      console.log(res.data);
      // Reload page
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard']);
      });
    }).catch((err) => {
      console.log(err);
    });
    });
  }

  public open(modal: any): void {
    this.modalService!.open(modal);
  }

  handleLogout(): void {
    this.auth!.logout({  });
  }

  addNewJob(): void {

  }

  drop(event: CdkDragDrop<string[]>) {
    var new_status: string = "";
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      switch (event.container.id) {
        case "cdk-drop-list-0":
          new_status = "Wishlist";
          break;
        case "cdk-drop-list-1":
          new_status = "Applied";
          break;
        case "cdk-drop-list-2":
          new_status = "Interview";
          break;
        case "cdk-drop-list-3":
          new_status = "Offer";
          break;
        case "cdk-drop-list-4":
          new_status = "Declined";
          break;
        default:
          break;
      }
      // Update job status
      this.getSub().subscribe((val) => {
        axios.post('http://localhost:3000/api/jobs/updateJobStatus/' + val, { jobs: event.container.data[0], status: new_status }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
      });
    }
  }
}
