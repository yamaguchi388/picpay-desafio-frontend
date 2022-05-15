import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-table-sort",
  templateUrl: "./table-sort.component.html",
  styleUrls: ["./table-sort.component.scss"],
})
export class TableSortComponent implements OnInit {
  @Output() sortEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSort() {
    this.sortEvent.emit();
  }
}
