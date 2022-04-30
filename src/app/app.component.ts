import { Component, OnInit } from '@angular/core';

import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  showPassword: boolean = false;

  faEye = faEye;

  ngOnInit() {
  }
}
