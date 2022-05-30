import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { IPayment } from "src/app/interfaces/IPayment";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() payments: IPayment[];
  @Input() loading: boolean = false;
  @Output() onChangeSort = new EventEmitter<{
    sortField: string;
    sortOrder: string;
  }>();
  @Output() openDeleteModal = new EventEmitter<IPayment>();
  @Output() openEditModal = new EventEmitter<IPayment>();

  private _sortField = "username";
  private _sortOrder = "asc";

  get sortField(): string {
    return this._sortField;
  }

  @Input() set sortField(sortField: string) {
    this._sortField = sortField;
  }

  get sortOrder(): string {
    return this._sortOrder;
  }

  @Input() set sortOrder(sortOrder: string) {
    this._sortOrder = sortOrder;
  }

  constructor() {}

  ngOnInit(): void {}

  changeSortField(sortField: string) {
    if (this.sortField != sortField) {
      this.sortField = sortField;
      this.sortOrder = "asc";
    } else {
      this.sortOrder = this.sortOrder == "asc" ? "desc" : "asc";
    }

    this.onChangeSort.emit({
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    });
  }

  onDelete(payment: IPayment) {
    this.openDeleteModal.emit(payment);
  }

  onEdit(payment: IPayment) {
    this.openEditModal.emit(payment);
  }
}
