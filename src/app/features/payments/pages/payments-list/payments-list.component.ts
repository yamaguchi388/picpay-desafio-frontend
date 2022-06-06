import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PaymentCreateEditComponent } from "../../components/payment-create-edit/payment-create-edit.component";

@Component({
  selector: "app-payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.scss"],
})
export class PaymentsListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openModal() {
    this.dialog.open(PaymentCreateEditComponent, {
      width: "750px",
      panelClass: 'payment-create-edit'
    });
  }
}
