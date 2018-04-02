import { NgModule } from '@angular/core';
import { Select2Component } from './select2.component';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [Select2Component],
  providers: [],
  imports: [CommonModule],
  declarations: [Select2Component]
})
export class Select2Module {
}
