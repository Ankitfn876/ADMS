import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthJWTService } from './services/auth/auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private auth:AuthJWTService) {}

   canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
