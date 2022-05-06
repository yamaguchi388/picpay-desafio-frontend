import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

import { DialogAdd } from './../../components/molecules/dialog/dialog-add/dialog-add.component';
import { DialogEdit } from './../../components/molecules/dialog/dialog-edit/dialog-edit.component';
import { DialogDelete } from './../../components/molecules/dialog/dialog-delete/dialog-delete.component';

import { currentPaymentPage, TasksService, totalTaskItems } from './../../services/tasks/tasks.service';

import { PaymentData } from 'src/models/PaymentData';
import { FilterParamData } from 'src/models/FilterParamData';
import { PageInfoData } from 'src/models/PageInfoData';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {
  pageSizeOptions: Array<number> = [5, 10, 50, 100];
  dataSource: Array<PaymentData> = [];
  length: number = 0;
  displayedColumns: Array<string> = ['user', 'title', 'date', 'value', 'payed', 'edit', 'remove'];
  filterParams: FilterParamData = {
    param: '',
    value: ''
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     private tasksService: TasksService,
     public dialog: MatDialog
     ) { }

  ngOnInit(): void {
    this.tasksService.getTotalTaskItems();
    this.tasksService.getTaskApi();
    currentPaymentPage.subscribe((paymentList: Array<PaymentData>) => {
      this.dataSource = paymentList;
    })

    totalTaskItems.subscribe((totalItems: number) => {
      this.length = totalItems;
      this.tasksService.paymentListLength = this.length;
    });

  }

  handlePageEvent(pageItems: PageInfoData){
    if(pageItems.pageSize !== this.tasksService.limitItems){
      this.tasksService.setLimitItems(pageItems.pageSize);
    }

    if((pageItems.pageIndex + 1) !== this.tasksService.currentPage){
      this.tasksService.setCurrentPage(pageItems.pageIndex + 1);
    }
  
    currentPaymentPage.subscribe((paymentList: Array<PaymentData>) => {
      this.dataSource = paymentList;
    })
  }

  setDeleteItem(paymentItem: PaymentData){
    this.tasksService.setCurrentPayment(paymentItem);
  }

  setEditItem(paymentItem: PaymentData){
    this.tasksService.setCurrentPayment(paymentItem);
  }

  openDialogEdit() {
    this.dialog.open(DialogEdit);
  }

  openDialogDelete() {
    this.dialog.open(DialogDelete);
  }

  openDialogAdd() {
    this.dialog.open(DialogAdd);
  }

  filterPayments(...params: Array<FilterParamData>){
    this.tasksService.filterPayments(params)
  }

  handleInputNameChildren(params: FilterParamData){
    this.filterParams = params;
  }

  filterPaymentsOnClick(){
    this.filterPayments(this.filterParams);
  };

}



