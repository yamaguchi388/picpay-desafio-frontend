import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/auth/auth.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: User;
  showUserOptions = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onShowUserOptions = (): void => {
    this.showUserOptions = !this.showUserOptions;
  }

  logout = (): void => {
    this.onShowUserOptions();
    this.authService.logout();
    this.router.navigate(['login']);
  }

  goToHome = (): void => {
    this.router.navigate(['dashboard']);
  }

  goToProfilePage = (): void => {
    this.onShowUserOptions();
    this.router.navigate(['profile']);
  }
}
