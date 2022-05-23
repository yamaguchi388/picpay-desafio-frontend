import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() pageNumber: number = 1;
  @Input() totalCount: number = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 100];
  @Input() currentPageSizeOption: number;

  pageLinks: (string | number)[] = [];
  paginatorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.currentPageSizeOption = this.pageSizeOptions[0];
    this.paginatorForm = this.fb.group({
      pageNumber: [this.pageNumber],
      pageSize: [this.currentPageSizeOption]
    });
  }

  createGroup(): FormGroup {
    return this.paginatorForm;
  }

  ngOnChanges(): void {

    this.pageLinks = this.getPageLinks();
  }

  getPageLinks(): (string | number)[] {
    var current = this.pageNumber,
        last = Math.ceil(this.totalCount / this.currentPageSizeOption),
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
  }

  setPage(pageNumber: any): void {
    if(pageNumber === '...') return;
    if(typeof pageNumber === 'string') pageNumber = parseInt(pageNumber);
    this.pageNumber = pageNumber;
    this.paginatorForm.patchValue({ pageNumber: this.pageNumber });
    this.pageLinks = this.getPageLinks();
  }

  nextPage(): void {
    if(this.pageNumber === Math.ceil((this.totalCount / this.currentPageSizeOption))) return;
    this.pageNumber++;
    this.paginatorForm.patchValue({ pageNumber: this.pageNumber });
    this.pageLinks = this.getPageLinks();
  }

  previousPage(): void {
    if(this.pageNumber === 1) return;
    this.pageNumber--;
    this.paginatorForm.patchValue({ pageNumber: this.pageNumber });
    this.pageLinks = this.getPageLinks();
  }

  changePageSize(pageSize: string): void {
    this.currentPageSizeOption = parseInt(pageSize);
    this.pageLinks = this.getPageLinks();
  }
}
