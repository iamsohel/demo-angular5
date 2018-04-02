import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Address, Employee, Employees } from '../../../new-employee/employee';
import { EmployeeService } from '../../employee.service';
import { AppConfig } from '../../../../../../../_config/app';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpService } from '../../../../../../../auth/_services/http.service';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
  selector: 'app-change-details',
  templateUrl: './change-details.component.html',
  styles: []
})
export class ChangeDetailsComponent implements OnInit {
  employee: Employee;
  companyNames: Array<any>;
  personalDetailsFrom: FormGroup;
  contactDetailsForm: FormGroup;
  sub: Subscription;
  contactUpdated: boolean;
  profileUpdated: boolean;
  addressForm: FormGroup;
  showAddressForm: boolean;
  showEditAddressForm: boolean;
  updatableId: number;
  updateIndex: number;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private http: HttpService) {
    this.employee = new Employees().init();
    this.personalDetailsFrom = this.fb.group(this.createPersonalDetailsFrom());
    this.contactDetailsForm = this.fb.group(this.createContactDetailsForm());
    this.addressForm = this.fb.group(this.createAddressForm());
    this.sub = this.employeeService.employeeObserver().subscribe(employee => {
      this.employee = employee;
      if (this.employee.first_name.length) {
        this.setContactFormValue();
        this.setProfileFormValue();
        this.sub.unsubscribe();
      }
    });
    const app = new AppConfig();
    this.companyNames = app.companies;

  }

  ngOnInit() {
  }

  createPersonalDetailsFrom() {
    return {
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      company_name: ['', Validators.required],
      job_title: ['', Validators.required],
    };
  }

  createAddressForm() {
    return {
      address_type: ['', Validators.required],
      address_line: ['', Validators.required],
      city: '',
      state: '',
      country: '',
      zip_code: '',
    };
  }

  createContactDetailsForm() {
    return {
      phone: '',
      home_phone: '',
      mobile: '',
      website: '',
      fax: '',
      facebook: '',
      google: '',
      linkedin: '',
      twitter: '',
    };
  }

  setProfileFormValue() {
    this.personalDetailsFrom.setValue({
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      company_name: this.employee.company_name,
      job_title: this.employee.job_title
    });
  }

  setContactFormValue() {
    this.contactDetailsForm.setValue({
      phone: this.employee.phone,
      home_phone: this.employee.home_phone,
      mobile: this.employee.mobile,
      website: this.employee.website,
      fax: this.employee.fax,
      facebook: this.employee.facebook,
      google: this.employee.google,
      linkedin: this.employee.linkedin,
      twitter: this.employee.twitter,
    });

  }

  onCompanySelected(data) {
    this.personalDetailsFrom.markAsTouched();
  }

  updatePersonalInfo(form: FormGroup) {
    if (form.valid) {
      const data = form.getRawValue();
      this.http.put('employees/update/' + this.employee.id, data).toPromise().then(res => {
        this.showSuccess('profileUpdated');
        this.updateEmployee(data);
        this.personalDetailsFrom.reset();
        this.setProfileFormValue();
      });
    }
  }

  showSuccess(type) {
    this[type] = true;
    setTimeout(_ => {
      this[type] = false;
    }, 3000);
  }

  updateContactInfo(form: FormGroup) {
    if (form.valid) {
      const data = form.getRawValue();
      this.http.put('employees/updateContact/' + this.employee.id, data).toPromise().then(res => {
        this.showSuccess('contactUpdated');
        this.updateEmployee(data);
        this.contactDetailsForm.reset();
        this.setContactFormValue();
      });
    }
  }

  updateEmployee(data: any) {
    Object.keys(data).forEach(val => {
      this.employee[val] = data[val];
    });
    this.employeeService.setEmployee(this.employee);
  }

  addAddress(form: FormGroup) {
    if (form.valid) {
      const data = form.getRawValue();
      this.http.post('employees/addAddress/' + this.employee.id, data).toPromise().then(res => {
        data.id = res.result.id;
        this.employee.address.push(data);
        this.employeeService.setEmployee(this.employee);
        this.resetAddressForm();
      });
    }
  }

  deleteAddress(id: number, index: number) {
    this.http.delete('employees/deleteAddress/' + id).toPromise().then(res => {
      this.employee.address.splice(index, 1);
    });
  }

  toggleEditAddressForm() {
    this.showEditAddressForm = !this.showEditAddressForm;
    this.showAddressForm = false;
  }

  toggleAddAddressForm() {
    this.showAddressForm = !this.showAddressForm;
    this.showEditAddressForm = false;
  }

  resetAddressForm() {
    this.addressForm.reset();
    this.showAddressForm = false;
    this.showEditAddressForm = false;
  }

  showUpdateAddress(address: Address, index) {
    this.addressForm.setValue({
      address_type: address.address_type,
      address_line: address.address_line,
      city: address.city || '',
      zip_code: address.zip_code || '',
      state: address.state || '',
      country: address.country || '',
    });
    this.updatableId = address.id;
    this.updateIndex = index;
    this.toggleEditAddressForm();
  }

  updateAddress(form) {
    if (form.valid) {
      const data = form.getRawValue();
      this.http.put('employees/updateAddress/' + this.updatableId, data).toPromise().then(res => {
        data.id = this.updatableId;
        this.employee.address[this.updateIndex] = data;
        console.log(this.employee.address[this.updateIndex]);
        this.employeeService.setEmployee(this.employee);
        this.resetAddressForm();
      });
    }
  }
}
