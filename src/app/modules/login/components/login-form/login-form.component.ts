import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { lowercaseValidator } from './../../../../shared/validators/lowercase.validators';
import { AuthService } from 'src/app/shared/services/login.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  public userLoginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sweetAlertService: SweetAlertService,

  ) {}

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, lowercaseValidator],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(7),
          ],
        ]
      },
    );
  }


  public onSubmit(): void {
    if (this.userLoginForm.invalid) {
      return
    }

    const crendentials = this.userLoginForm.value;
    this.authService.login(crendentials)
      .subscribe(
        (user) => {
          console.log(user);
          const usuario = user[0]
          this.router.navigate(['core']);
          this.sweetAlertService.show({
            icon: 'success',
            text: `Bem vindo novamente ${usuario?.name}!`
          });   
        },
        (err) => {
          console.log(err);
          this.sweetAlertService.show({
            icon: 'success',
            text: `Login não confere.`
          });           
        }
      )
  }
}


