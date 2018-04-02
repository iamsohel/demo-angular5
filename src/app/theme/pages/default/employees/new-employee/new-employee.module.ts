import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewEmployeeComponent } from './new-employee.component';
import { UserSearchModule } from '../../../../layouts/users-search/user-search.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from '../../../../layouts/select2/select2.module';
import { FormErrorModule } from '../../../../layouts/form-error/form-error.module';
import { AuthService } from '../../../../../_services/auth.service';
import { HttpService } from '../../../../../auth/_services/http.service';
import { BsSwitchModule } from '../../../../layouts/bs-switch/bs-switch.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInspectorService } from '../../../../../_services/http-inspector.service';

const routes: Routes = [
  {
    path: '',
    component: NewEmployeeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserSearchModule,
    FormErrorModule,
    Select2Module,
    RouterModule.forChild(routes),
    BsSwitchModule
  ],
  declarations: [NewEmployeeComponent],
  bootstrap: [NewEmployeeComponent],
  providers: [
    AuthService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInspectorService,
      multi: true
    }],
  exports: [RouterModule]
})
export class NewEmployeeModule {
}
