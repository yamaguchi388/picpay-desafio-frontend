import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PoEmailComponent, PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('inputEmail') inputEmail: PoEmailComponent;

  email: string;
  senha: string;

  form = new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null)
  })

  constructor(
    private readonly poNotification: PoNotificationService,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.form.valid){
      this.loginService.login(this.email, this.senha).subscribe((usuario) => {
        if (usuario){
          this.router.navigate(['/home']);
        }else{
          this.poNotification.error({message: 'Usuário ou senha não correspondem'});
        }
        
      }, (erro) => {
        this.poNotification.error({message: erro.message});
      });
      
    }else{
      this.poNotification.error({message: 'Necessário preencher todos campos para entrar'});
    }
  }

}
