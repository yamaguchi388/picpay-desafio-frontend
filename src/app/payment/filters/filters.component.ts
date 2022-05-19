import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterObject } from './../../models/filter-object';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  form!: FormGroup;
  filter!: FilterObject;
  datePipe = new DatePipe('pt-BR');

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { filters: FilterObject },
    private dialogRef: MatDialogRef<FiltersComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.data)
      this.filter = this.data.filters;
    this.form = this.formBuilder.group({
      value: [this.filter?.value ? this.filter?.value.toString().replace(".", ",") : ''],
      title: [this.filter?.title ?? ''],
      payed: [this.filter?.payed ?? ''],
      date: [this.filter?.date ? new Date(this.datePipe.transform(this.filter?.date, 'yyyy-MM-dd') + 'T00:00:00.000') : '']
    })

  }

  newObjectFilter(): FilterObject {
    return {
      value: this.form.get('value')?.value ? this.form.get('value')?.value.replace(",", ".") : null,
      title: this.form.get('title')?.value ?? null,
      payed: this.form.get('payed')?.value ?? null,
      date: this.form.get('date')?.value ? this.datePipe.transform(this.form.get('date')?.value, 'yyyy-MM-dd') : null
    }
  }

  onSubmit(): void {
    this.dialogRef.close(this.newObjectFilter());
  }

  onClean(clean: boolean): void {
    this.form.reset();
    if (clean) {
      this.dialogRef.close(this.newObjectFilter());
    } else {
      this.dialogRef.close(null);
    }
  }

}
