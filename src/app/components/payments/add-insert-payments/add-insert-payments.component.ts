import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'picpay-add-payments',
  templateUrl: './add-insert-payments.component.html',
  styleUrls: ['./add-insert-payments.component.scss']
})
export class AddInsertPaymentsComponent implements OnInit {
  public action = 'edit';
  public pageTitle = 'Adicionar Pagamento';
  public paymentForm = new FormGroup({});


  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      value: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', Validators.required],
      title: ['', Validators.required],
    });
  }

  public setDialogTitle(): void {
    this.action === 'edit' ? this.pageTitle = 'Editar Pagamento' : this.pageTitle = 'Adicionar Pagamento';
  }

}
