import { Component, OnInit } from "@angular/core";

@Component({
  selector: "picpay-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  public title: string = "Meus Pagamentos";

  constructor() {}

  ngOnInit(): void {}

  public addPayment(): void {
  }
}
