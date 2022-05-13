import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayment } from 'src/app/shared/interfaces/payment';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss'],
})

export class NewPaymentComponent implements OnInit {
  form: FormGroup;
  title = 'Adicionar pagamento';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IPayment
  ) {}

  get formIsInvalid() {
    return this.form.invalid;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      title: ['', Validators.required],
    })

    if (this.data) {
      this.title = 'Alterar pagamento';
      const { name, username, value, date, title} = this.data;

      this.form.patchValue({
        name,
        date: this.formatDate(date),
        username,
        title,
        value,
      });

    }
  }

  public formatDate(date: string) {
    if (!date) { return; }
    return date?.split('Z');;
  }

  cancelAddPayment(): void {
    this.dialogRef.close();
  }

  addPayment() {
    if (this.formIsInvalid) { return; }
    const data = { ...this.data, ...this.form.getRawValue() };
    this.dialogRef.close(data);
  }
}