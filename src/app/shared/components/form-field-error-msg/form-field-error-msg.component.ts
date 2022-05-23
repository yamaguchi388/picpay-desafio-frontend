
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-field-error-msg',
  templateUrl: './form-field-error-msg.component.html',
  styleUrls: ['./form-field-error-msg.component.scss']
})
export class FormFieldErrorMsgComponent implements OnInit {

  @Input() message: string;
  @Input() showError: string;

  constructor() { }

  ngOnInit(): void {
  }
}
