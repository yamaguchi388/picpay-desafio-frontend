import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentModel } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {

  displayedColumns: string[] = ["username", "title", "value", "date", "isPayed"];
  dataSource: MatTableDataSource<PaymentModel>;
  totalRecords: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() hidePageSize: boolean = true;

  loaded: boolean = false;


  constructor(
    private paymentService: PaymentService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.paymentService.searchAllPayments().pipe().subscribe((paymentsResponse: PaymentModel[]) => {
      this.totalRecords = paymentsResponse.length;
      this.dataSource = new MatTableDataSource<PaymentModel>(paymentsResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaded = true;
    });
  }

  searchPayments(event) {
debugger;
  }

  sortData(sort: Sort) {
    // const data = this.desserts.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }

    // this.sortedData = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name': return compare(a.name, b.name, isAsc);
    //     case 'calories': return compare(a.calories, b.calories, isAsc);
    //     case 'fat': return compare(a.fat, b.fat, isAsc);
    //     case 'carbs': return compare(a.carbs, b.carbs, isAsc);
    //     case 'protein': return compare(a.protein, b.protein, isAsc);
    //     default: return 0;
    //   }
    // });
  }
}
