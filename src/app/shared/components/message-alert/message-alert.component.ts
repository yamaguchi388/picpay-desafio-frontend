import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

type TypeMessage = 'success' | 'error';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent implements OnChanges {

  @Input() showMessage: boolean;
  @Input() type: TypeMessage = 'success';
  @Output() hideMessage: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.showMessage) {
      setTimeout(() => {
        this.showMessage = false;
        this.hideMessage.emit();
      }, 3000);
    }
  }

}
