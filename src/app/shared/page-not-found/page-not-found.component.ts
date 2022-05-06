import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/services/auth.service';
import { SessionManagerService } from 'src/app/core/authentication/services/session-manager.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectTo(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl('/meuspagamentos');
    }
    this.router.navigateByUrl('/login');
  }

}
