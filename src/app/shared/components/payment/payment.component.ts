import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  @Input()
  task: Task;

  @Input()
  index: number;

  @Output()
  delete = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  showActions: boolean = false;

  constructor() { }

}
