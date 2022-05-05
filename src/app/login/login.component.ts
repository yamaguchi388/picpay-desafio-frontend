import { DialogService } from './../shared/services/dialog/dialog.service';
import { userModel } from './../shared/models/user.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { LoginService } from '../shared/services/login/login.service';
import { AuthService } from '../shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  public form : FormGroup;
  public hide = true;
  public loginError = false;

  constructor(
    private diologService: DialogService,
    private loginService: LoginService,
    private authService: AuthService,
  ){}

  public ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    this.loginError = false
    if(!this.form.valid){
      this.form.controls.email.markAsTouched();
      this.form.controls.password.markAsTouched();

      if(this.form.controls.email.invalid){
        this.emailInput.nativeElement.focus();
        return;
      } else {
        this.passwordInput.nativeElement.focus();
        return;
      }
    }
    this.login()
  }

  public login() {
    this.loginService.getUser(
      this.form.get('email').value, 
      this.form.get('password').value
    )
    .pipe(
      take(1)
    )
    .subscribe(
      response => this.onSucess(response),
      error => {
        this.diologService.getErrors(error);
      },
    )
  }

  public showErrors(nomeControle: string){
    if(!this.form.controls[nomeControle]){
      return false;
    }
    return this.form.controls[nomeControle].invalid && this.form.controls[nomeControle].touched;
  }

  public onSucess(response: userModel): void {
    if(Object.keys(response).length === 0){
      this.loginError = true;
      return;
    }

    this.authService.setuser(response)
  }

}

