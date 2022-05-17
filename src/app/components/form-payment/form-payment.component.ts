import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionEnum } from 'src/app/enums/action.enum';
import { PaymentModel } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

export interface DialogData {
  action: ActionEnum;
  payment: PaymentModel;
}

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss']
})
export class FormPaymentComponent implements OnInit {

  paymentForm: FormGroup;

  msgDelete: string = '';

  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<FormPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    switch (this.data.action) {
      case ActionEnum.INSERT:
        this.initDataPayment();
        break;
      case ActionEnum.UPDATE:
        this.loadDataPayment();
        break;
      case ActionEnum.DELETE:
        this.loadDataPayment();
        this.msgDelete = 'Tem certeza que deseja deletar esse pagamento?';
        this.paymentForm.disable();
        break;
      default:
        this.snackBar.open('Opção inválida!', 'OK');
        break;
    }
  }

  initDataPayment() {
    this.paymentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      user: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      value: new FormControl(0, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      title: new FormControl('', Validators.maxLength(60)),
      image: new FormControl(),
      paid: new FormControl(),
    });
  }

  loadDataPayment() {
    this.paymentForm = new FormGroup({
      name: new FormControl(this.data.payment.name, [Validators.required, Validators.maxLength(40)]),
      user: new FormControl(this.data.payment.username, [Validators.required, Validators.maxLength(40)]),
      value: new FormControl(this.data.payment.value, [Validators.required]),
      date: new FormControl(this.data.payment.date, [Validators.required]),
      title: new FormControl(this.data.payment.title, Validators.maxLength(60)),
      image: new FormControl(this.data.payment.image),
      paid: new FormControl(this.data.payment.isPayed),
    });
  }

  savePayment(): void {
    if (this.paymentForm.valid || this.data.action === ActionEnum.DELETE) {
      switch (this.data.action) {
        case ActionEnum.INSERT:
          this.insertPayment();
          break;
        case ActionEnum.UPDATE:
          this.updatePayment();
          break;
        case ActionEnum.DELETE:
          this.deletePayment();
          break;
        default:
          this.snackBar.open('Opção inválida!', 'OK');
          break;
      }
      this.closedDialog();
    } else {
      this.snackBar.open('Preencha os campos obrigatórios antes de prosseguir, por favor!', 'OK');
    }
  }

  insertPayment() {
    this.data.payment = new PaymentModel();
    this.setPaymentValue();
    this.paymentService
      .insertPayment(this.data.payment)
      .pipe()
      .subscribe(() => this.snackBar.open('Pagamento inserido com sucesso!', 'OK'));
  }

  setPaymentValue() {
    this.data.payment.name = this.paymentForm.value.name;
    this.data.payment.username = this.paymentForm.value.user;
    this.data.payment.value = this.paymentForm.value.value;
    this.data.payment.date = this.paymentForm.value.date;
    this.data.payment.title = this.paymentForm.value.title;
    this.data.payment.image = this.paymentForm.value.image;
    this.data.payment.isPayed = this.paymentForm.value.paid ? this.paymentForm.value.paid : false;
  }

  updatePayment() {
    this.setPaymentValue();
    this.paymentService
      .updatePayment(this.data.payment.id, this.data.payment)
      .pipe()
      .subscribe(() => this.snackBar.open('Pagamento atualizado com sucesso!', 'OK'));
  }

  deletePayment() {
    this.paymentService
      .deletePayment(this.data.payment.id)
      .pipe()
      .subscribe(() => this.snackBar.open('Pagamento deletado com sucesso!', 'OK'));
  }

  closedDialog() {
    this.dialogRef.close();
  }
}
