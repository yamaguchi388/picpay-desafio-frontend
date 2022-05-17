import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';

interface Account {
  id?: number,
  name?: string,
  email?: string,
  password?: string
}

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form!: FormGroup;
  visibility!: boolean;
  btnText: string = 'entrar';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  onSubmit(): void {
    if(this.form.valid) {
      this.authService.login(this.form.get('email')?.value, this.form.get('password')?.value)
        .subscribe((result: Account[]) => {
          console.log('result', result)
        });
    }
  }

}
