import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'picpay-button',
  templateUrl: './picpay-button.component.html',
  styleUrls: ['./picpay-button.component.scss'],
})
export class PicpayButtonComponent implements OnInit {
  @Input() tipo: string;
  @Input() fixWidth: string;
  @Input() fixHeight: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() class: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onClick(event: any): any {
    if (!this.disabled && !this.loading) this.clickEvent.emit(event);
  }
}
