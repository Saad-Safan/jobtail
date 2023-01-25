import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAddEditComponent } from 'src/app/job-add-edit/job-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  authStatus: string = "Not logged in";

  constructor(private _dialog: MatDialog, public auth: AuthService, private modalService: NgbModal, @Inject(DOCUMENT) private doc: Document, public router: Router) {
    this.modalService = modalService;
  }

  

   openAddEditJobForm() {
    this._dialog.open(JobAddEditComponent);
    }
   

  ngOnInit(): void {
    
  }

  public open(modal: any): void {
    this.modalService!.open(modal);
  }

  user$ = this.auth.user$;
  // Get token 
  token$ = this.auth.idTokenClaims$;
  // Get token['sub']
  sub$: string = "";

  // TODO: Replace with actual data
  // Hook up to MongoDB
  wishlistJobs: any[] = [{ name:"HiWi",employer:"RWTH",description:"Entwicklung einer Microservice-Infrastruktur zur kontinuierlichen"}];
  appliedJobs: any[] = [];
  interviewJobs: any[] = [];
  offerJobs: any[] = [];
  declinedJobs: any[] = [];

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
