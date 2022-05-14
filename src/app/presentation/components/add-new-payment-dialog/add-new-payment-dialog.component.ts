import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';

export const DATE_FORMATS = {
  display: {
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  },
};

@Component({
  selector: 'app-add-new-payment-dialog',
  templateUrl: './add-new-payment-dialog.component.html',
  styleUrls: ['./add-new-payment-dialog.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class AddNewPaymentDialogComponent implements OnInit, OnDestroy {
  addNewPaymentForm: FormGroup;
  destroy$ = new Subject<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly paymentsService: PaymentsService,
    public readonly matDialogRef: MatDialogRef<AddNewPaymentDialogComponent>,
  ) {}

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.addNewPaymentForm = this.formBuilder.group({
      name: [null, Validators.required],
      username: [null],
      date: [null, Validators.required],
      value: [null, Validators.required],
      title: [null],
    });
  }

  close(dialogData?: { success?: boolean }) {
    this.matDialogRef.close(dialogData);
  }

  onSubmit() {
    this.paymentsService
      .newPayment(this.addNewPaymentForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.close({ success: true });
      });
  }
}
