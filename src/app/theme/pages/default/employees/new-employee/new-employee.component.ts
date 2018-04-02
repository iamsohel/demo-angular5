import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../auth/_services/http.service';
import { AppConfig } from '../../../../../_config/app';
import { Employee, Employees } from './employee';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../_services/auth.service';

declare var $: any;

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styles: []
})
export class NewEmployeeComponent implements OnInit, AfterViewInit {
  companyNames: Array<any>;
  employee: Employee;
  employees: Employees;
  employeeForm: FormGroup;
  token: string | boolean;
  userDataUrl: string;
  compnaySelectOptions = {
    placeholder: 'Select a Company',
  };
  companyName: string;

  constructor(private http: HttpService, private fb: FormBuilder, private auth: AuthService) {
    this.token = this.auth.getToken();
    this.userDataUrl = new AppConfig().apiEndPoint + 'users/findUser';
    const app = new AppConfig();
    this.companyNames = app.companies;
    this.employees = new Employees();
    this.employee = this.employees.init();
    this.employeeForm = this.createForm();
    this.employeeForm.controls.visibility.valueChanges.subscribe(val => {

      if (val === 2) {
        this.employeeForm.get('users').setValidators([Validators.required, Validators.minLength(1)]);
        this.employeeForm.get('users').setErrors(Validators.required);
      } else {
        this.employeeForm.get('users').setValidators(null);
      }
    });
  }

  initAddress(): FormGroup {
    return this.fb.group({
      address_type: ['Mailing Address', Validators.required],
      address_line: ['', Validators.required],
      city: '',
      zip_code: '',
      state: '',
      country: '',
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      company_name: ['', Validators.required],
      job_title: ['', Validators.required],
      phone: '',
      home_phone: '',
      mobile: '',
      website: '',
      fax: '',
      facebook: '',
      google: '',
      linkedin: '',
      twitter: '',
      address: this.fb.array([
        this.initAddress(),
      ]),
      visibility: [1, Validators.required],
      users: null,
      activation_link: false,
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  addEmployee(form: FormGroup) {
    if (form.valid) {
      this.http.post('employees/add', form.getRawValue()).subscribe(val => {
        this.auth.navigateTo('/employees/all');
      });
    }
  }

  addAnother(form: FormGroup) {
    console.log(form, form.getRawValue());
    this.http.post('employees/add', form.getRawValue()).subscribe(val => {
      this.reset();
    });
  }

  addAddress() {
    const control = <FormArray>this.employeeForm.controls['address'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.employeeForm.controls['address'];
    control.removeAt(i);
  }

  reset() {
    this.employeeForm.reset();
    this.employeeForm.get('visibility').setValue(1);
    this.companyName = '';
  }

  onUserSelect(data) {
    if (!data.length) {
      this.employeeForm.get('users').setErrors(Validators.required);
    } else {
      this.employeeForm.get('users').setErrors(null);
      this.employeeForm.get('users').setValue(data);
    }
  }

  onCompanySelected(data) {
    this.employeeForm.markAsTouched();
  }

  onActivationStatusChanged(data) {
    console.log(data);
  }
}


