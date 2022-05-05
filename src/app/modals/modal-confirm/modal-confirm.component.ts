import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss', '../modals.scss']
})
export class ModalConfirmComponent implements OnInit {

  onClose: Subject<any>;

  message: string;
  confirmButton: string; 
  declineButton: string;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  confirm() {
    this.onClose.next(true); 
    this.bsModalRef.hide();
  }

  decline() {
    this.onClose.next(false); 
    this.bsModalRef.hide();
  }

}
