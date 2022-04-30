import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  showPassword: boolean = false;

  faEye = faEye;

  email: string = 'usuario@gmail.com'; // TODO mudar para string vazia
  password: string = 'usuario'; // TODO mudar para string vazia

  constructor (private router: Router, private appService: AppService, private toastr: ToastrService) {}

  ngOnInit() {
  }

  signIn() {
    this.appService.getAccountByEmail(this.email).then(
      success => {
        if (!success || success.length === 0) {
          this.toastr.error('E-mail não cadastrado.');
          
        } else {
          const account = success[0];
          
          if (account.password != this.password) {
            this.toastr.error('Senha incorreta.');
          } else {
            this.router.navigateByUrl('home');
          }
        }
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }
}
