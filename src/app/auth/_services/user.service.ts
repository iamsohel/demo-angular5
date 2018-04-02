import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: HttpService, private _cookie: CookieService) {
  }

  user: any;

  verify(): Observable<any> {
    if (!this._cookie.getObject('currentUser')) {
      return this.http.get('users/verify').map((response: Response) => response.json());
    } else {
      return new Observable<any>(observe => {
        setTimeout(() => {
          observe.next({ status: 'ok' });
        }, 100);
      });
    }
  }

  forgotPassword(email: string) {
    return this.http.post('users/forgotPassword', { email }).map(res => {
    });
  }

  getAll() {
    return this.http.get('/api/users').map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('users/' + id).map((response) => response.json());
  }

  create(user: User) {
    return this.http.post('users', user).map((response) => response.json());
  }

  update(user: User) {
    return this.http.put('users/' + user.id, user).map((response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('users/' + id).map((response) => response.json());
  }

  // private helper methods
  checkStatus(): Observable<boolean> {
    return new Observable<any>(observer => {
      setInterval(() => {
        const user: any = this._cookie.getObject('currentUser');
        if (user) {
          if (user.token) {

            observer.next(true);
          } else {
            observer.next(false);
          }
        } else {
          observer.next(false);
        }
      });
    });
  }

  private jwt() {
    // create authorization header with jwt token
    const cUser = this._cookie.getObject('currentUser');
    let currentUser = '';
    if (cUser) {
      this.user = cUser;
    } else {
      currentUser = null;
      this.user = null;
    }
    if (this.user && this.user.token) {
      console.log(this.user.token);
      const headers = new Headers({ 'Authorization': 'Bearer ' + this.user.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
