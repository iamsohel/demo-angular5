import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { AuthModule } from './auth/auth.module';
import { CookieModule } from 'ngx-cookie';
import { HttpInspectorService } from './_services/http-inspector.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './_services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ScriptLoaderService, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInspectorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
