import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  error: boolean = false;
  hide = true;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  public hidePassword(): void {
    this.hide = false;
  }

  public showPassword(): void {
    this.hide = true;
  }

  public login(): void {
    this.authService.getAccount().subscribe(response => {
      if(response[0].email == this.loginForm.get('email').value && response[0].password == this.loginForm.get('password').value){
        this.router.navigateByUrl('tasks');
        return;
      } else {
        this.error = true;
      }
    }); 
  }

}
