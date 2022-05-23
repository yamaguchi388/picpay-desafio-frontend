import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-info',
  templateUrl: './date-info.component.html',
  styleUrls: ['./date-info.component.scss']
})
export class DateInfoComponent implements OnInit {

  @Input() date!: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
