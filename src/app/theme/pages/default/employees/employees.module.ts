import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UsersSearchComponent } from '../../../layouts/users-search/users-search.component';
import { UpdateProfileComponent } from './employee-details/update-profile/update-profile.component';
import { UserSearchModule } from '../../../layouts/users-search/user-search.module';
import { FormErrorModule } from '../../../layouts/form-error/form-error.module';
import { AuthService } from '../../../../_services/auth.service';
import { Select2Module } from '../../../layouts/select2/select2.module';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'all',
        component: EmployeesComponent
      },
      {
        path: 'add',
        loadChildren: './new-employee/new-employee.module#NewEmployeeModule'
      },
      {
        path: 'details',
        loadChildren: './employee-details/employee-details.module#EmployeeDetailsModule',
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'all',
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
  ], exports: [
    RouterModule
  ],
  providers: [ScriptLoaderService, AuthService],
  declarations: [EmployeesComponent]
})
export class EmployeesModule {
}
