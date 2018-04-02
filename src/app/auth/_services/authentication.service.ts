import { Injectable } from '@angular/core';
// import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { UserAgentApplication } from 'msal';
import { Response } from '@angular/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { Helpers } from '../../helpers';
import { AppConfig } from '../../_config/app';

const applicationConfig = new AppConfig();
const application = new UserAgentApplication(applicationConfig.graphClientID,
  null, function(errorDesc, token, error, tokenType) {
  }.bind(this));

@Injectable()
export class AuthenticationService {
  application: any;
  app_config: any;

  constructor(private http: HttpService, private _cookie: CookieService, private router: Router) {

    this.application = application;
    this.app_config = applicationConfig;
  }

  login(email: string, password: string) {
    return this.http.post('users/login', { email: email, password: password })
      .map((response) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        const user = typeof response !== 'object' ? response.json().result.data : response.result.data;
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.login_type = 'email';
          this._cookie.putObject('currentUser', user);
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    this._cookie.remove('currentUser');
  }

  loginWithMicroSoft() {
    return application.loginPopup(applicationConfig.graphScopes).then((idToken) => {
      return this.acureSilent(idToken);
    });
  }

  acureSilent(idToken) {
    return application.acquireTokenSilent(applicationConfig.graphScopes).then((accessToken) => {
      console.log(accessToken, 'data');
      return this.getMsInfo(accessToken).subscribe(data => {
        this.updateMsUser(data, accessToken);
      });
    }, function(error) {
      Helpers.setLoading(false);
      return application.acquireTokenPopup(applicationConfig.graphScopes).then(accessToken => {
        console.log(accessToken, 'token');
        return this.getMsInfo(accessToken).subscribe(data => {
          this.updateMsUser(data, accessToken);

        });
      }, (err) => {
        return this.getMsInfo('').subscribe(data => {
          this.updateMsUser(data);
        });
      });
    });
  }

  getMsInfo(token: string | undefined): Observable<any> {
    return this.http.get('users/login-with-microsoft?access_token=' + token).map(response => {
      console.log(response);
      return response.result.data;
    });
  }

  updateMsUser(user_info, accessToken) {
    Helpers.setLoading(false);
    user_info.login_type = 'microsoft';
    user_info.access_token = accessToken;
    user_info.social_data = this.application.getUser();
    this._cookie.putObject('currentUser', user_info);
    this.router.navigate(['/dashboard']).then();
  }

  setUser(data) {
    this._cookie.putObject('currentUser', data);
  }

  signUp() {
  }

}
