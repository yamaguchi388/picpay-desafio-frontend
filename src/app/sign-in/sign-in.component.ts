import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { AppService } from '../app.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  showPassword: boolean = false;

  faEye = faEye;

  email: string = 'usuario@gmail.com'; // TODO mudar para string vazia
  password: string = 'usuario'; // TODO mudar para string vazia

  constructor (private router: Router, private appService: AppService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  signIn() {
    this.appService.getAccountByEmailAndPassword(this.email, this.password).then(
      success => {
        if (!success || success.length === 0) {
          this.toastr.error('E-mail e/ou senha incorretos.');
        } else {
          localStorage.setItem('email', this.email); // ideal seria encriptografar os dados via API (JWT)
          this.router.navigateByUrl('home');
        }
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }

}
