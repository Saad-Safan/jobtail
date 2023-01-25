import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAddEditComponent } from 'src/app/job-add-edit/job-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  sub : any = null;
  jobs : any[] = [];
  user$ = this.auth.user$;
  wishlistJobs: any[] = [{ title:"HiWi",company:"RWTH",description:"Entwicklung einer Microservice-Infrastruktur zur kontinuierlichen"}];
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
   
  getSub(): string {
     // Get sub from token converted to string
     this.sub = this.auth.idTokenClaims$.subscribe((val) => {
      this.sub = val?['sub'] : null
    });

    console.log(this.sub)

    if (!this.sub) {
      return "";
    }

    this.sub = this.sub.toString();
    this.sub = "Marawan"
    return this.sub;
  }

  ngOnInit(): void {
    this.sub = this.getSub();

    // Try and find user in DB
    axios.get('http://localhost:3000/api/jobs/getOne/' + this.sub ).then((res) => {
      // If user found, get jobs
      this.jobs = res.data[0].jobs;
      this.updateJobs(this.jobs);
    }).catch((err) => {
      // If user not found, create new user
      axios.post('http://localhost:3000/api/jobs/addUser', { user: this.sub }).then((res) => {
        // Get user's jobs
        axios.get('http://localhost:3000/api/jobs/getOne/' + this.sub ).then((res) => {
          this.jobs = res.data[0].jobs;
          this.updateJobs(this.jobs);
        }).catch((err) => {
          // If user not found, error
          console.log(err);
        });
      }).catch((err) => {
        // If user not created, error
        console.log(err);
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
    this.sub = this.getSub();
    // Remove job from user's jobs
    axios.post('http://localhost:3000/api/jobs/deleteJob/' + this.sub, { jobs: job }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });

    // Reload page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
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
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }


}
