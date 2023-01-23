import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  template: '<button (click)="handleLogin()">Log in</button><button (click)="handleSignUp()">Sign up</button>',
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/dashboard',
      },
    });
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
    appState: {
      target: '/profile',
    },
    //screen_hint: '/dashboard',
  });
  }
}
