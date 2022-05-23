import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PaymentEntity } from 'src/app/domain/interfaces/entity/payment-entity';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnChanges {

  @Input() payments: PaymentEntity[] = [];
  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 10;

  @Output() paymentStatusChanged = new EventEmitter<PaymentEntity>()
  @Output() deletePayment = new EventEmitter<PaymentEntity>();
  @Output() editPayment = new EventEmitter<PaymentEntity>();

  columnMode = ColumnMode;
  sort: {dir: string, prop: string} = {dir: '', prop: ''};

  constructor() { }

  ngOnChanges(): void {
  }

  onSort(event: any) {
    this.sort = event.sorts[0];
    console.log('sort', this.sort);
    let tempData = this.payments.sort((a: any, b: any) => {
      if (this.sort.dir === 'asc') {
        return a[this.sort.prop] > b[this.sort.prop] ? 1 : -1;
        } else {
          return a[this.sort.prop] < b[this.sort.prop] ? 1 : -1;
        }
    });

    this.payments = [...tempData];
  }

  toggleStatus(event: MatCheckboxChange, id: string): void {
    let index = this.payments.findIndex((item: PaymentEntity) => item.id === id);
    this.payments[index].isPayed = event.checked;
    this.payments = [...this.payments];

    this.paymentStatusChanged.emit(this.payments[index]);
  }
}
