import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { LoginService, SessionService } from 'src/app/core/core.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nome: string;

  profile: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    subtitle: this.session.getEmail(),
    title: this.session.getUsuario()
  };
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-exit', label: 'Exit', type: 'danger', separator: true, action: () => this.logout() }
  ];

  menus: Array<PoMenuItem> = [
    { 
      label: 'Início',
      icon: 'po-icon-home',
      shortLabel: 'Início'
    },
    { 
      label: 'Pagamentos',
      icon: 'po-icon-money',
      shortLabel: 'Pgto'
    },
    { 
      label: 'Configuração',
      icon: 'po-icon-settings',
      shortLabel: 'Config'
    },
    
  ];

  constructor(
    private readonly session: SessionService,
    private readonly loginService: LoginService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.nome = this.session.getUsuario();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
