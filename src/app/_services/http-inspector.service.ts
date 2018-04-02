import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class HttpInspectorService implements HttpInterceptor {

  constructor(private _cookie: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted request ... ');
    const current_user: any = this._cookie.getObject('currentUser');
    // Clone the request to add the new header.
    if (current_user) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + current_user.token),
      });
      console.log('Sending request with new header now ...');

      // send the newly created request
      return next.handle(authReq)
        .catch((error, caught) => {
          if (error.status === 401) {
            // logout users, redirect to login page
            // this._auth.removeToken();
            // redirect to the login page or show login modal here
            // this._auth.navigateTo('login').then(() => {
            // });
            return Observable.throw(error);
          } else {
            return Observable.throw(error);
          }
        }) as any;
    } else {
      console.log('No TOken Present ...');

      // send the newly created request
      return next.handle(req)
        .catch((error, caught) => {
          console.log(error);
          if (error.status === 401) {
            // logout users, redirect to login page
            // this._auth.removeToken();
            // redirect to the login page or show login modal here
            // this._auth.navigateTo('login').then(() => {
            // });
            return Observable.throw(error);
          } else {
            return Observable.throw(error);
          }
        }) as any;
    }
  }

}
