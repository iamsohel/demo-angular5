import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { EmployeeService } from './employee.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UsersSearchComponent } from '../../../../layouts/users-search/users-search.component';
import { UserSearchModule } from '../../../../layouts/users-search/user-search.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ChangePasswordComponent } from './update-profile/change-password/change-password.component';
import { ChangeAvatarComponent } from './update-profile/change-avatar/change-avatar.component';
import { HistoryComponent } from './history/history.component';
import { ChangeDetailsComponent } from './update-profile/change-details/change-details.component';
import { FormErrorModule } from '../../../../layouts/form-error/form-error.module';
import { HttpService } from '../../../../../auth/_services/http.service';
import { HttpInspectorService } from '../../../../../_services/http-inspector.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Select2Module } from '../../../../layouts/select2/select2.module';

const routes: Routes = [
  {
    path: ':id',
    component: EmployeeDetailsComponent,
    resolve: {
      employee: EmployeeService
    },
    children: [
      {
        path: '',
        component: ViewProfileComponent,
      },
      {
        path: 'update',
        component: UpdateProfileComponent,
        children: [
          {
            path: 'details',
            component: ChangeDetailsComponent
          },
          {
            path: 'password',
            component: ChangePasswordComponent,
          },
          {
            path: 'avatar',
            component: ChangeAvatarComponent,
          },
          {
            path: '**',
            redirectTo: 'details'
          }
        ]
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'files',
        loadChildren: './employee-files/employee-files.module#EmployeeFilesModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    Select2Module
  ], exports: [
    RouterModule
  ],
  providers: [ScriptLoaderService, EmployeeService, HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInspectorService,
      multi: true
    }],
  declarations: [
    EmployeeDetailsComponent, UpdateProfileComponent,
    ViewProfileComponent, ChangePasswordComponent,
    ChangeAvatarComponent, HistoryComponent,
    ChangeDetailsComponent
  ]
})
export class EmployeeDetailsModule {
}
