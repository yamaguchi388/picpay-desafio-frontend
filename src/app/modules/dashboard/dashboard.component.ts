import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { NavItem } from './../../shared/interfaces/nav-item.interface';
import { ProfileName } from './../../shared/enums/profile-name.enum';


@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public isSideMenuOpen: boolean = true;
  public profileEnum = ProfileName;
  public navItems: NavItem[] = [
    {
      title: 'Meus Pagamentos',
      active: true,
      route: '/core/payments',
      headerTitle: 'Meus Pagamentos',
    },
    {
      title: 'Minha Conta',
      active: true,
      route: '/core/account',
      headerTitle: 'Minha Conta',
    }
  ];

  usuario: User;
  usuarioName: string;
  perfil: string;
  title: string = 'PayFriends';
  footerDisplay: boolean = true;

  constructor(
    private router: Router,
  ) 
  {
    this.usuarioName = 'Usuario';
    this.perfil = this.profileEnum.ADMINISTRATOR;
   }

  ngOnInit(): void {
  }

  public onClickLogout(): void {
    this.router.navigate(['login']);
  }
  
  public toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }
  
  public toggleNavigate(nav: NavItem) {
    this.navItems = this.navItems.map(navItem => {
      navItem.active = navItem.route === nav.route ? true : false;
      return navItem;
    });

    this.router.navigate([nav.route]);
  }


}
