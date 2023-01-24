import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated$) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
