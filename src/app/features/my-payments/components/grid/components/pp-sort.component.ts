import { Component, EventEmitter, Output } from "@angular/core";

type SortType = "asc" | "desc";

@Component({
  selector: "pp-sort",
  templateUrl: "./pp-sort.component.html",
})
export class PpSortComponent {
  @Output() sort = new EventEmitter<SortType>();

  onClick(sort: SortType) {
    this.sort.emit(sort);
  }
}
