import { NgModule } from '@angular/core';
import { FormErrorComponent, FormErrorMessageComponent } from './form-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  exports: [FormErrorComponent, FormErrorMessageComponent],
  providers: [],
  declarations: [FormErrorComponent, FormErrorMessageComponent],
})
export class FormErrorModule {
}
