import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-error-message',
  templateUrl: './input-error-message.component.html',
  styleUrls: ['./input-error-message.component.css']
})
export class InputErrorMessageComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() formInput: string;


  constructor() { }

  ngOnInit() {
  }

  get inputErrorMessage() {
    if (this.form.controls[this.formInput]) {
      const errors = this.form.controls[this.formInput].errors;
      for (const errorName in errors) {
        if (errors[errorName]) {
          switch (errorName) {
            case 'required':
              return null;
            case 'minlength':
              return `Must be at least ${this.form.controls[this.formInput].errors.minlength.requiredLength} characters long.`;
            case 'maxlength':
              return `Must be at most ${this.form.controls[this.formInput].errors.maxlength.requiredLength} characters long.`;
            case 'email':
              return 'PLEASE_ENTER_AN_EMAIL_ADDRESS';
            default:
              return this.form.controls[this.formInput].errors[errorName];
          }
        }
      }
      return null;
    }
  }

}
