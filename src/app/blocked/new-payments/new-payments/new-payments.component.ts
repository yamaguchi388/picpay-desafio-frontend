import { PaymentsService } from './../../../shared/services/payments/payments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { PaymentModel } from 'src/app/shared/models/payment.model';
import { DatePipe } from '@angular/common';
import { DateService } from 'src/app/shared/services/date/date.service';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.scss']
})
export class NewPaymentsComponent implements OnInit {

  public form: FormGroup;
  public isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PaymentModel,
    public dialogRef: MatDialogRef<NewPaymentsComponent>,
    private paymentService: PaymentsService,
    private diologService: DialogService,
    private dateService: DateService,
    private cdRef:ChangeDetectorRef
  ) { }

  public closeDialog() {    
    this.dialogRef.close(this.form.value);
  }

  public ngOnInit(): void {
    if(this.data){
      this.isEdit = true;
      this.createForm(this.data);
    } else {
      this.isEdit = false;
      this.createForm(new PaymentModel());
    }
  }

  public ngAfterViewChecked() {
    if(this.data){
      this.data.date = this.dateService.formatTime(this.data.date)
      this.cdRef.detectChanges();
    }
    
  }

  public createForm(payment: PaymentModel): void {
    this.form = new FormGroup({
      id: new FormControl(payment.id),
      name: new FormControl(payment.name, [Validators.required]),
      username: new FormControl(payment.username, [Validators.required]),
      title: new FormControl(payment.title),
      value: new FormControl(payment.value, [Validators.required]),
      date: new FormControl(payment.date, [Validators.required]),
      image: new FormControl(payment.image),
      isPayed: new FormControl(payment.isPayed),
    });
  }

  public onSubmit(): void {
    if(this.isEdit){
      this.editPayment();
    } else {
      this.createPayment();
    }
  }

  public createPayment() {
    this.paymentService.createPayments(
      this.form.value
    )
    .pipe(
      take(1)
    )
    .subscribe(
      response => {
        this.closeDialog();
      },
      error => {
        this.diologService.getErrors(error);
      },
    )
  }

  public editPayment() {
    this.paymentService.editPayments(
      this.form.value
    )
    .pipe(
      take(1)
    )
    .subscribe(
      response => {
        this.closeDialog();
      },
      error => {
        this.diologService.getErrors(error);
      },
    )
  }

  public showErrors(nomeControle: string){
    if(!this.form.controls[nomeControle]){
      return false;
    }
    return this.form.controls[nomeControle].invalid && this.form.controls[nomeControle].touched;
  }
}
