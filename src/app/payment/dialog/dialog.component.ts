import { DialogObject } from './../../models/dialog-object';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  dialog!: DialogObject;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogObject,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    console.log('this.data', this.data)
    if (this.data)
      this.dialog = this.data;
  }

  close(value: boolean): void {
    console.log('value', value)
    this.dialogRef.close(value);
  }

}
