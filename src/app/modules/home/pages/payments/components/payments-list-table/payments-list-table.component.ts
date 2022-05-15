import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IPaginator, IPayment } from "../../interfaces";

@Component({
  selector: "app-payments-list-table",
  templateUrl: "./payments-list-table.component.html",
  styleUrls: ["./payments-list-table.component.scss"],
})
export class PaymentsListTableComponent implements OnChanges {
  @Input() payments: IPaginator<IPayment[]>;

  @Output() pageChangeEvent = new EventEmitter();
  @Output() applyFilterEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() payedEvent = new EventEmitter();

  displayedColumns: string[] = [
    "username",
    "title",
    "date",
    "value",
    "isPayed",
    "actions",
  ];

  filterValue: string = "";

  dataSource: MatTableDataSource<IPayment> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.payments.items);
    this.dataSource.sort = this.sort;
  }

  getDateFormatedValue(fullDate: string, isDate: boolean) {
    const [date, hour] = fullDate.split("T");
    return isDate ? date : hour;
  }

  pageChange(event: PageEvent) {
    this.payments.page = event.pageIndex;
    this.payments.limit = event.pageSize;

    this.pageChangeEvent.emit();
  }

  applyFilter() {
    this.applyFilterEvent.emit(this.filterValue);
  }

  onEditEvent(value: IPayment) {
    this.editEvent.emit(value);
  }

  onDeleteEvent(value: IPayment) {
    this.deleteEvent.emit(value);
  }

  onPayedEvent(value: IPayment) {
    this.payedEvent.emit(value);
  }
}
