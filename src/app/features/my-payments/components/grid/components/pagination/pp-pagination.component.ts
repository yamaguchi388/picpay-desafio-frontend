import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "pp-pagination",
  templateUrl: "./pp-pagination.component.html",
  styleUrls: ["./pp-pagination.component.scss"],
})
export class PpPaginationComponent implements OnChanges {
  @Input() totalPages: number = 0;
  @Input() pageIndex: number = 1;
  @Output() pagechanged = new EventEmitter<number>();
  pageIndexLocal = 1;
  totalPagesLocal = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.pageIndexLocal = this.pageIndex;
    if (this.totalPages) this.totalPagesLocal = this.totalPages;
  }

  ngOnInit(): void {}

  onClickPage(page: number) {
    this.pagechanged.emit(page);
  }

  get previousPage() {
    return this.pageIndex - 1;
  }

  get nextPage() {
    return this.pageIndex + 1;
  }
}
