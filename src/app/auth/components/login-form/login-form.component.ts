import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthCredentials } from 'src/app/shared/models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() loading = false;
  @Output() submitFormValue = new EventEmitter();

  form = this.createForm();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
  createForm() {
    const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    return new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const formValue: AuthCredentials = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    this.submitFormValue.emit(formValue);
  }
}
