import { AddInsertPaymentsComponent } from './add-insert-payments/add-insert-payments.component';
import { Task } from 'src/app/models/task.model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {MatDialog} from '@angular/material/dialog';

import { PaymentService } from "src/app/services/paymentService/payment.service";

@Component({
  selector: "picpay-payments",
  templateUrl: "./fetch-payments.component.html",
  styleUrls: ["./fetch-payments.component.scss"],
})
export class FetchPaymentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public title: string = "Meus Pagamentos";
  public checked = false;
  public dataSource = new MatTableDataSource<Task>();
  displayedColumns: string[] = ["name", "title", "date", "value", "isPayed", "actions"];

  constructor(
    private readonly paymentService: PaymentService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  public getPayments(): void {
    this.paymentService.getPayments().subscribe((tasks) => {
      this.dataSource.data = Object.values(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public clicked(): void {

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addPayment(): void {
    const dialogRef = this.dialog.open(AddInsertPaymentsComponent, {
      width: '90vw',
      height: '70vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public deletePayment(): void {}
}
