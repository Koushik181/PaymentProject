import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private router : Router,
                private auth:AuthService) {
  }
  canActivate():boolean{
      if(this.auth.verifyLoggedIn()){
          return true;
      }else{
          this.router.navigate(['/login']);
          return false;
      }
  }
}
