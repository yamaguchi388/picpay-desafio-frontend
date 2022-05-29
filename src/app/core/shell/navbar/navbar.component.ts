/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { ROUTES } from 'src/app/shared/consts/routes';
import { Router } from '@angular/router';
import { StateClear } from 'ngxs-reset-plugin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  @Dispatch()
  logout() {
    this.navigateToAuth();
    return new StateClear();
  }

  navigateToAuth() {
    this.router.navigateByUrl(ROUTES.AUTH);
  }
}
