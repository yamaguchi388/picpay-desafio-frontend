import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/models/LoginData';

import {AuthService} from 'src/services/account/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  matcher = new MyErrorStateMatcher();

  hide = true;

  login: LoginData = {
    email: '',
    password: ''
  };

  constructor(
    private accountService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

  }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      this.router.navigate(['']);
    } catch(error){
      console.error(error);
    }
  }

}
