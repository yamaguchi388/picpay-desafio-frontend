import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  filters: any[] = [];
  counter: number = 0;

  constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.filters.length > 0) {
      this.filters = data.filters;
    }
  }

  ngOnInit(): void {}

  addInput(): void {
    this.filters.push({
      id: (Math.random() + 1).toString(36).substring(7),
      column: '',
      value: '',
    });
  }

  setField(id: string, column: string): void {
    let index = this.filters.findIndex(filter => filter.id === id);
    this.filters[index].column = column;
  }

  setValue(id: string, value: string): void {
    let index = this.filters.findIndex(filter => filter.id === id);
    this.filters[index].value = value;
  }

  remove(id: string): void {
    let index = this.filters.findIndex(filter => filter.id === id);
    this.filters.splice(index, 1);
  }

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(this.filters);
  }
}
