import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit {

  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      queryString: ['']
    });
  }

  ngOnInit(): void {
  }

  createGroup(): FormGroup {
    return this.filterForm;
  }
}
