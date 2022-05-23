import { Component, Input, OnInit } from '@angular/core';
import { PaymentEntity } from 'src/app/domain/entity/payment-entity';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() payment!: PaymentEntity;

  constructor() {
  }

  ngOnInit(): void {
  }
}
