import { Component, Input, OnInit } from "@angular/core";
import { IPayment } from "../../interfaces";

@Component({
  selector: "app-payments-list-table",
  templateUrl: "./payments-list-table.component.html",
  styleUrls: ["./payments-list-table.component.scss"],
})
export class PaymentsListTableComponent implements OnInit {
  @Input() payments: IPayment[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.payments);
  }
}
