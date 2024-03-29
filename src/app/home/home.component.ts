import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  template: '<button (click)="handleLogin()">Log in</button><button (click)="handleSignUp()">Sign up</button>',
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router, @Inject(DOCUMENT) private doc?: Document) {}

  
  // Reroute to dashboard if user is already logged in
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((val) => {
      if (val) {
        this.handleLogin();
      }
    });
  }

  isAuthenticated$ = this.auth.isAuthenticated$

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: 'http://localhost:4200/dashboard',
      },
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/dashboard',
      }
    });
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
    appState: {
      target: 'http://localhost:4200/dashboard',
    },
    authorizationParams: {
      screen_hint: 'signup',
      redirect_uri: 'http://localhost:4200/dashboard',
    }
  });
  }

  handleLogout(): void {
    this.auth!.logout();
  }
}
