import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountInfo } from 'src/app/core/authentication/models/user-account-info';
import { SessionManagerService } from 'src/app/core/authentication/services/session-manager.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  user: UserAccountInfo;

  constructor(private sessionManager: SessionManagerService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.sessionManager.getUser();
  }

  backToPayments(): void {
    this.router.navigateByUrl('/meuspagamentos');
  }

}
