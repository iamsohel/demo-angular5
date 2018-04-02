import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee, Employees } from '../../new-employee/employee';
import { AppConfig } from '../../../../../../_config/app';

declare var $: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styles: []
})
export class UpdateProfileComponent implements OnInit, AfterViewInit {

  constructor(private empServ: EmployeeService, private route: ActivatedRoute) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
}
