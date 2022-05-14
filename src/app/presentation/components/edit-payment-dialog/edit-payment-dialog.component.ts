import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';
import { Payment } from 'src/app/data/models/payments.model';

@Component({
  selector: 'app-edit-payment-dialog',
  templateUrl: './edit-payment-dialog.component.html',
  styleUrls: ['./edit-payment-dialog.component.scss'],
})
export class EditPaymentDialogComponent implements OnInit, OnDestroy {
  @Input() payment: Payment;
  editPaymentForm: FormGroup;
  destroy$ = new Subject<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly paymentsService: PaymentsService,
    public readonly matDialogRef: MatDialogRef<EditPaymentDialogComponent>,
  ) {}

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.editPaymentForm = this.formBuilder.group({
      name: [this.payment.name, Validators.required],
      username: [this.payment.username],
      date: [this.payment.date, Validators.required],
      value: [this.payment.value, Validators.required],
      title: [this.payment.title],
      isPayed: [this.payment.isPayed],
    });
  }

  close(): void {
    this.matDialogRef.close();
  }

  editPayment(): void {
    this.paymentsService
      .editPayment({ ...this.payment, ...this.editPaymentForm.value })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.matDialogRef.close({ success: true });
      });
  }
}
