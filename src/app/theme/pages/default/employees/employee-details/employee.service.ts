import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../auth/_services/http.service';
import { Employee, Employees } from '../new-employee/employee';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/of';

@Injectable()
export class EmployeeService implements Resolve<Employee> {
  employee: Employee;
  employees: Employees;

  constructor(private _http: HttpService) {
    this.employees = new Employees();
    this.employee = this.employees.init();
  }

  setEmployee(employee: Employee) {
    this.employee = employee;
  }

  getEmployee(): Employee {
    return this.employee;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> {
    return this.getEmployeeObs(route.paramMap.get('id'));
  }

  employeeObserver() {
    return new Observable<Employee>(observer => {
      setInterval(_ => {
        observer.next(this.getEmployee());
      }, 1000);
    });
  }

  getEmployeeObs(id: any): Observable<Employee> {
    return this._http.get('employees/' + id).map(res => {
      res = this.mapResp(res);
      return res;
    });
  }

  mapResp(res): Employee {
    const details = res.result.data;
    return {
      id: details.id,
      user_id: details.user_id,
      first_name: details.first_name,
      last_name: details.last_name,
      email: details.email,
      company_name: details.company_name,
      job_title: details.job_title,
      phone: details.phone,
      home_phone: details.home_phone,
      mobile: details.mobile,
      website: details.website || '',
      fax: details.fax,
      facebook: details.facebook,
      google: details.google,
      linkedin: details.linkedin,
      twitter: details.twitter,
      address: details.address,
      active: details.active,
    };
  }
}
