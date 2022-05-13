import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  constructor(private readonly matDialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {}

  cancel() {
    this.matDialogRef.close({ answer: false });
  }

  confirm(): void {
    this.matDialogRef.close({ answer: true });
  }
}
