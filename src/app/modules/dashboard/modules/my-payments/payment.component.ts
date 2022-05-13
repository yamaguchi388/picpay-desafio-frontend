import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  public isSideMenuOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  public toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }
}


