import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Login } from 'src/app/shared/state-management/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  unauthorized: boolean = false;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginStore: Store<{ login: boolean }>
  ) { }

  ngOnInit(): void {
    this.newForm();
  }

  newForm(): void {
    this.loginForm = this.fb.group({
      email: ['', { validators: [ Validators.required ] }],
      password: ['', { validators: [ Validators.required ] }],
    }); 
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    
    this.loginStore.dispatch(Login({ email, password }));
    this.loginStore.pipe(select('login')).subscribe(
      (logged: boolean) => {
        if(logged) {
          this.router.navigate([ 'meus-pagamentos' ]);
        }
        else {
          this.unauthorized = true;
        }
      }
    )
  }
}
