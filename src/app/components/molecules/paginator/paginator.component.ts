import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
})
export class PaginatorComponent implements OnInit {
  @Output() onChangePage = new EventEmitter<number>();
  @Output() onChangePageSize = new EventEmitter<number>();

  pageOptions: number[] = [];
  pageSize: number = 0;
  private _pages: number = 5;
  private _selectedPage: number = 0;

  get pages(): number {
    return this._pages;
  }
  get selectedPage(): number {
    return this._selectedPage;
  }

  @Input()
  set selectedPage(page: number) {
    this.adaptPageOptions(page);

    this._selectedPage = page;
  }
  @Input()
  set pages(pages: number) {
    this._pages = pages;

    this.adaptPageOptions(this.selectedPage);
  }

  constructor() {}

  ngOnInit(): void {
    this.fillPageOptions();
  }

  fillPageOptions() {
    this.pageOptions = [];

    if (this.pages < 5) {
      for (let i = 1; i <= this.pages; i++) {
        this.pageOptions.push(i);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        this.pageOptions.push(i);
      }
    }
  }

  pageChange(page: number) {
    if (page === this.selectedPage) return;

    if (page <= this.pages && page > 0) {
      this.selectedPage = page;

      this.onChangePage.emit(this.selectedPage);
    }
  }

  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;

    this.pageChange(1);
    this.onChangePageSize.emit(this.pageSize);
  }

  adaptPageOptions(page: number) {
    if (this.pages == 0) {
      this.pageOptions = new Array();
      return;
    }

    const wantedPageIndex = this.pageOptions.findIndex(
      (pageOption) => pageOption == page
    );

    if (page > this.selectedPage && wantedPageIndex == -1) {
      this.incrementPageOptions();
    } else if (page == this.pageOptions[0] - 1 && wantedPageIndex == -1) {
      this.decrementPageOptions();
    } else if (page == 1 || page > this.pages) {
      this.createPageOptions();
    }
  }

  createPageOptions() {
    this.pageOptions = new Array();

    for (let i = 1; i <= this.pages && i <= 5; i++) {
      this.pageOptions.push(i);
    }
  }

  incrementPageOptions() {
    const adapt = [...this.pageOptions];
    this.pageOptions = new Array();

    adapt.forEach((el) => this.pageOptions.push(el + 1));
  }

  decrementPageOptions() {
    const adapt = [...this.pageOptions];
    this.pageOptions = new Array();

    adapt.forEach((el) => this.pageOptions.push(el - 1));
  }
}
