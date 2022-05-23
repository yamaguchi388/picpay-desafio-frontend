import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../dialogs/filter-dialog/filter-dialog.component';
import { FilterInputComponent } from '../filter-input/filter-input.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-filter-tab',
  templateUrl: './filter-tab.component.html',
  styleUrls: ['./filter-tab.component.scss']
})
export class FilterTabComponent implements OnInit {

  @Input() totalCount: number = 10;

  @ViewChild(FilterInputComponent, { static: true }) filterForm!: FilterInputComponent;
  @ViewChild(PaginatorComponent, { static: true }) paginatorForm!: PaginatorComponent;

  @Output() filterChanged = new EventEmitter<any>();
  @Output() customFilterChanged = new EventEmitter<any>();

  @Input() customFilters: any[] = [];

  public filterTabForm!: FormGroup;
  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterTabForm = this.formBuilder.group({
      filter: this.filterForm.createGroup(),
      paginator: this.paginatorForm.createGroup(),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.filterTabForm.valueChanges.subscribe((value) => {
      this.filterChanged.emit(value);
    });
  }

  openCustomFilters(): void {
    this.matDialog
      .open(FilterDialogComponent, {
        width: '500px',
        data: {
          filters: this.customFilters
        }
      })
      .afterClosed()
      .subscribe((value) => {
        if (value.length > 0) {
          this.customFilters = value;
          return this.customFilterChanged.emit(value);
        }
      });
  }
}
