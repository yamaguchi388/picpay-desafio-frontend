import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IPayment } from '../../interfaces';

@Component({
  selector: 'app-new-payment-dialog',
  templateUrl: './new-payment-dialog.component.html',
  styleUrls: ['./new-payment-dialog.component.scss'],
})
export class NewPaymentDialogComponent implements OnInit {
  form: FormGroup;
  title = 'Adicionar pagamento';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IPayment
  ) {}

  get formIsInvalid() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      username: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(1)]],
    });

    if (this.data) {
      const { name, date, username, title, value } = this.data;

      this.form.patchValue({
        name,
        date: this.formatDateToDisplayOnInput(date),
        username,
        title,
        value,
      });

      this.title = 'Alterar pagamento';
    }
  }

  private formatDateToDisplayOnInput(date: string) {
    if (!date) { return; }

    const [dateAndHour] = date?.split('Z');
    return dateAndHour;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submitNewGroup() {
    if (this.formIsInvalid) { return; }

    const payload = {
      ...this.data,
      ...this.form.getRawValue(),
    };

    this.dialogRef.close(payload);
  }
}
