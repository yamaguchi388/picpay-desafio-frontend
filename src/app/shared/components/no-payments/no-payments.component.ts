import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-no-payments',
  templateUrl: './no-payments.component.html',
  styleUrls: ['./no-payments.component.scss']
})
export class NoPaymentsComponent {

  @Output()
  goBackClick = new EventEmitter();

  constructor() { }

}
