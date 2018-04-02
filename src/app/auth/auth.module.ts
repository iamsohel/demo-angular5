import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {BaseRequestOptions } from '@angular/http';

import { AuthRoutingModule } from './auth-routing.routing';
import { AuthComponent } from './auth.component';
import { AlertComponent } from './_directives/alert.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { CookieModule, CookieService } from 'ngx-cookie';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpInspectorService } from "../_services/http-inspector.service";
import { HttpService } from "./_services/http.service";
// import {MockBackend} from '@angular/http/testing';
// import {fakeBackendProvider} from './_helpers';

@NgModule({
  declarations: [
    AuthComponent,
    AlertComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    CookieModule.forChild()
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    CookieService,
    // api backend simulation
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInspectorService,
      multi: true
    }
  ],
  entryComponents: [AlertComponent],
})

export class AuthModule {
}

