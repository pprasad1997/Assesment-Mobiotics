import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{

  constructor(private authService : AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) :
  boolean |
  Promise<boolean> |
  Observable<boolean>{
    return this.authService.isLogged.
      pipe(
        map(
          status => {
            if(!status.loggedIn) {
              alert('Please Login');
              this.router.navigate(['']);
              return;
            }
            return true;
          }
        )
      )
  }
}
