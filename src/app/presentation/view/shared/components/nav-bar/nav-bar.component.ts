import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.logout.emit();
  }
}
