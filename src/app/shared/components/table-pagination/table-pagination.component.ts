import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {

  @Input() changePagination?: (page: number) => void;
  @Input() numberOfPages: number;
  @Input() currentPage: number;

  pages: number[];

  constructor() { }

  ngOnInit(): void {
    this.pages = [...Array(this.numberOfPages).keys()];
  }

  generateButtonId = (page: number) => {
    return `button-change-page-${page}`;
  }

  getCurrentPage = (): number => {
    return this.currentPage;
  }

  changePaginationLeft = (): void => {
    this.changePagination(this.currentPage - 1);
  }

  changePaginationRight = (): void => {
    this.changePagination(this.currentPage + 1);
  }
}
