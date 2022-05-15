import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Payment } from "../../models/payment.model";

@Component({
  selector: "pp-grid",
  templateUrl: "./pp-grid.component.html",
  styleUrls: ["./pp-grid.component.scss"],
})
export class PpGridComponent implements OnInit {
  @Input() data: Observable<Payment[]>;
  @Output() sort = new EventEmitter<{ sort: string; prop: string }>();
  @Output() edit = new EventEmitter<Payment>();
  @Output() delete = new EventEmitter<Payment>();
  @Output() search = new EventEmitter<string>();
  @Output() pageSize = new EventEmitter<number>();
  value: string = "";

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    this.search.emit(this.value);
  }

  onSort(sort: string, prop) {
    this.sort.emit({ prop, sort });
  }

  onPageSizeChange(page: number) {
    this.pageSize.emit(page);
  }

  onEdit(item: Payment) {
    this.edit.emit(item);
  }

  onDelete(item: Payment) {
    this.delete.emit(item);
  }
}
