import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  template: '<button (click)="handleLogin()">Log in</button><button (click)="handleSignUp()">Sign up</button>',
})
export class HomeComponent {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc?: Document) {}
  
  isAuthenticated$ = this.auth.isAuthenticated$

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/dashboard',
      },
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/dashboard',
      }
    });
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
    appState: {
      target: '/profile',
    },
    authorizationParams: {
      screen_hint: 'signup',
      redirect_uri: 'http://localhost:4200/dashboard',
    }
  });
  }

  handleLogout(): void {
    this.auth!.logout({ returnTo: this.doc!.location.origin });
  }
}
