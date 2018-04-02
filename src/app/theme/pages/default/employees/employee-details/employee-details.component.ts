import { Component, OnInit } from '@angular/core';
import { Employee } from '../new-employee/employee';
import { HttpService } from '../../../../../auth/_services/http.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styles: []
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;

  constructor(private route: ActivatedRoute, private empService: EmployeeService) {
  }

  ngOnInit() {
    this.employee = this.route.snapshot.data['employee'];
    if (this.employee) {
      this.empService.setEmployee(this.employee);
    }
    this.empService.employeeObserver().subscribe(val => {
      this.employee = val;
    });
  }
}
