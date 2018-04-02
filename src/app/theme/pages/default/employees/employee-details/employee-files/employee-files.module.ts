import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFilesComponent } from './employee-files.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmployeeFilesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeFilesComponent],
  bootstrap: [EmployeeFilesComponent],
  exports: [
    RouterModule
  ]
})
export class EmployeeFilesModule {
}
