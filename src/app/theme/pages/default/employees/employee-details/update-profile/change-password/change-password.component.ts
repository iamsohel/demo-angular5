import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../../../../auth/_services/http.service';
import { EmployeeService } from '../../employee.service';
import { Employee, Employees } from '../../../new-employee/employee';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/toPromise';
import { AlertService } from '../../../../../../../auth/_services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  employee: Employee;
  sub: Subscription;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private http: HttpService, private alert: AlertService) {
    this.employee = new Employees().init();
    this.changePasswordForm = this.fb.group({
      confirm_password: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.sub = this.employeeService.employeeObserver().subscribe(employee => {
      this.employee = employee;
      if (this.employee.first_name.length) {
        this.sub.unsubscribe();
      }
    });
  }

  ngOnInit() {
  }

  changePassword(form) {
    if (form.valid) {
      this.http.post('users/change-password/' + this.employee.id, form.getRawValue()).toPromise().then(res => {
        this.alert.success(res.result.message);
        this.changePasswordForm.reset();
      });
    }
  }

}
