import { userModel } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: userModel;

  constructor(
    private router: Router
  ) { }

  public setuser(user: userModel){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    if(this.user){
      return this.user;
    }
    const userGuardado = localStorage.getItem('user');
    if(userGuardado){
      this.user = JSON.parse(userGuardado);
      return this.user;
    }
    return null;
  }

  public estaLogado(): boolean{
    return this.getUser()? true: false;
  }

  public logout(){
    this.user = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
