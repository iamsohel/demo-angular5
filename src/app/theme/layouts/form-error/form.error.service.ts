import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class FormErrorService {
  control: FormControl;
  message: string;

  constructor() {
  }
}

