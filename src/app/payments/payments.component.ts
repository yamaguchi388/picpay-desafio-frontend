import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetPayments } from '../core/state/actions/payment-state.actions';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  ngOnInit(): void {
    this.getPayments();
  }

  @Dispatch()
  getPayments() {
    return new GetPayments({ _page: 1, _limit: 10 });
  }
}
