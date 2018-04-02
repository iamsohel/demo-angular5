import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (state.url !== '/login') {
      this.observeStatus();
    }
    return this._userService.verify().map(
      data => {
        console.log(data);
        if (data !== null) {
          // logged in so return true
          return true;
        }
        // error when verify so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then();
        return false;
      },
      error => {
        // error when verify so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then();
        return false;
      });
  }

  observeStatus(): void {
    this._userService.checkStatus().subscribe(value => {
      if (!value) {
        this._router.navigate(['/login']).then();
      }
    });
  }
}
