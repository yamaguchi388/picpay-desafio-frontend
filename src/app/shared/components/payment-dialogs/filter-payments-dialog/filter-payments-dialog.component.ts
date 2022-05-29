import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-payments-dialog',
  templateUrl: './filter-payments-dialog.component.html',
  styleUrls: ['./filter-payments-dialog.component.scss']
})
export class FilterPaymentsDialogComponent {
  filterForm: FormGroup = this.formBuilder.group({
    title: [''],
    date: [''],
    value: [''],
    isPayed: ['']
  });

  constructor(private formBuilder: FormBuilder) {}
}
