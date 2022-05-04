import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Filters } from 'src/app/classes/Filters';

@Component({
  selector: 'app-modal-filters',
  templateUrl: './modal-filters.component.html',
  styleUrls: ['./modal-filters.component.scss', '../modals.scss']
})
export class ModalFiltersComponent implements OnInit {

  onClose: Subject<any>;
  filters?: Filters;

  title?: string;
  date?: string;
  minValue?: number;
  maxValue?: number;
  isPayed?: boolean;

  constructor(private bsModalRef: BsModalRef, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.setDefaultVariables();
  }

  search() {
    if (this.minValue && this.maxValue && this.minValue > this.maxValue) { // valida se o minValue é maior que o maxValue 
      this.toastr.error('Valor mínimo não pode ser maior que o valor máximo');
      return;
    }

    this.setFilters();

    this.onClose.next(this.filters); 
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }

  private setFilters() {
    this.filters.title    = this.title;
    this.filters.date     = this.date;
    this.filters.minValue = this.minValue
    this.filters.maxValue = this.maxValue
    this.filters.isPayed  = this.isPayed
  }

  private setDefaultVariables() {
    this.title    = this.filters.title;
    this.date     = this.filters.date;
    this.minValue = this.filters.minValue
    this.maxValue = this.filters.maxValue
    this.isPayed  = this.filters.isPayed
  }
}
