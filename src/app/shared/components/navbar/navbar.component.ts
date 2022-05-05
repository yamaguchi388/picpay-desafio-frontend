import { Component, OnInit } from '@angular/core';
import { UserAccountInfo } from 'src/app/core/authentication/models/user-account-info';
import { SessionManagerService } from 'src/app/core/authentication/services/session-manager.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: UserAccountInfo;

  constructor(private sessionManager: SessionManagerService) { }

  ngOnInit(): void {
    this.user = this.sessionManager.getUser();
  }

}
