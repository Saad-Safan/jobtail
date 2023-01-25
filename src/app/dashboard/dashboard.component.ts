import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  constructor(public auth?: AuthService, private modalService?: NgbModal, @Inject(DOCUMENT) private doc?: Document) {
    this.modalService = modalService;
    
  }

  public open(modal: any): void {
    this.modalService!.open(modal);
  }

  // TODO: Replace with actual data
  // Hook up to MongoDB
  wishlistJobs: any[] = [{ name:"HiWi",employer:"RWTH",description:"Entwicklung einer Microservice-Infrastruktur zur kontinuierlichen"}];
  appliedJobs: any[] = [];
  interviewJobs: any[] = [];
  offerJobs: any[] = [];
  declinedJobs: any[] = [];

  handleLogout(): void {
    this.auth!.logout({ returnTo: this.doc!.location.origin });
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
