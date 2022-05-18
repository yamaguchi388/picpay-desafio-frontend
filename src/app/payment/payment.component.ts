import { PaymentService } from './../service/payment.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

interface PaymentObject {
  id?: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image?: string,
  isPayed: boolean
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  dataSource!: PaymentObject[];

  constructor(private paymentService: PaymentService) { }
  
  ngOnInit(): void {
    this.subscription = this.paymentService.getPayment()
    .subscribe((response: HttpResponse<PaymentObject[]>) => {
      this.dataSource = response.body;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

}
