import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserModel } from 'src/app/models/user.model'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.criarForm()
  }

  criarForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  logar() {
    if (this.formLogin.invalid) return
    var user = this.formLogin.getRawValue() as UserModel
    this.userService.logar(user).subscribe((response) => {
      if (!response.sucesso) {
        this.snackBar.open(
          'Falha na autenticação',
          'Usuário ou senha incorretos.',
          {
            duration: 3000,
          },
        )
      }
    })
  }
}
