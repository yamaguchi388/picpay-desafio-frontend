import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../models/login-credentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isAuthenticated: boolean = false;
  authStatus: string = '';

  constructor(private formBuilder:FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cleanFormFields();
  }

  cleanFormFields(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    let credentials: LoginCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    if(credentials.email && credentials.password){
      this.authStatus = this.authService.authenticate(credentials);

      switch(this.authStatus){
        case 'success': {
          // toast successfull and redirect
          this.router.navigateByUrl('/');
          this.cleanFormFields();
          break;
        }
        case 'invalid': {
          // toast invalid and ser form invalid
          this.cleanFormFields();
          break;
        }
        case 'error': {
          // toast error
          this.cleanFormFields();
          //clean form
        }
      }
    }
  }

}
