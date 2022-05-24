import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Pagination } from '../../models/pagination.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges  {

  @Output()
  nextPage = new EventEmitter();

  @Output()
  previousPage = new EventEmitter();

  @Output()
  goToPage = new EventEmitter<number>();

  @Input()
  pagination: Pagination;

  currentPage: number = 1;
  pages: number[] = [];

  ngOnChanges(): void {
    this.pagination
    this.getPages();
  }

  goTo(page: number): void {
    this.currentPage = page;
    this.goToPage.emit(page);
    this.getPages();
  }

  nextPages(): void {
    if(this.currentPage + 1 < this.totalPages) {
      this.currentPage += 1;
      this.nextPage.emit(this.currentPage);
      this.getPages();
    }
  }

  previousPages(): void {
    if(this.currentPage - 1 > 0) {
      this.currentPage -= 1;
      this.previousPage.emit(this.currentPage);
      this.getPages();
    }
  }

  getPages(): void {
    this.pages = [];

    if(this.currentPage - 2 < 1) {
      if(this.totalPages < 5) {
        for(let i = 1; i <= this.totalPages; i++) {
          this.pages.push(i)
        }
      }
      else {
        for(let i = 1; i <= 5; i++) {
          this.pages.push(i)
        }
      }
    }
    else if(this.currentPage - 2 > 0 && this.currentPage + 2 < this.totalPages) {
      for(let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
        this.pages.push(i)
      }
    }
    else {
      if(this.totalPages - 5 < 1) {
        for(let i = 1; i <= this.totalPages; i++) {
          this.pages.push(i)
        }
      }
      else {
        for(let i = this.totalPages - 4; i <= this.totalPages; i++) {
          this.pages.push(i)
        }
      }
    }
  }

  get totalPages(): number {
    return Math.round(this.pagination.total / this.pagination.limit);
  }
}
