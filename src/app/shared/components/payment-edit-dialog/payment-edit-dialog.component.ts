import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-edit-dialog',
  templateUrl: './payment-edit-dialog.component.html',
  styleUrls: ['./payment-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentEditDialogComponent {
  updatePaymentForm = this.formBuilder.group({
    username: ['', Validators.required],
    valor: ['', Validators.required],
    date: ['', Validators.required],
    title: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {}
}
