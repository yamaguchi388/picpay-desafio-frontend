import { subject, totalTaskItems } from './../../services/tasks/tasks.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { PaymentData } from 'src/models/PaymentData';
import { TasksService } from 'src/services/tasks/tasks.service';
@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {
  pageSizeOptions: Array<number> = [5, 10, 50, 100];
  dataSource: Array<PaymentData> = [];
  length: number = 0;
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'payed', 'edit', 'remove'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  input = {
    value: 'carro'
  }

  constructor(
     private tasksService: TasksService
     ) { }

  ngOnInit(): void {
    this.tasksService.getTotalTaskItems();
    this.tasksService.getTaskApi();
    subject.subscribe((data) => {
      this.dataSource = this.dataSource.concat(data);
    })

    totalTaskItems.subscribe((total) => {
      this.length = total;
    });

  }

  handlePageEvent(event){
    if(event.pageSize !== this.tasksService.limitItems){
      this.tasksService.setLimitItems(event.pageSize);
    }

    if((event.pageIndex + 1) !== this.tasksService.currentPage){
      this.tasksService.setCurrentPage(event.pageIndex + 1);
    }
  
    subject.subscribe((data) => {
      this.dataSource = data;
    })
  }

  deleteItem(item){
    this.tasksService.delete(item.id);
    subject.subscribe((data) => {
      this.dataSource = data;
    })
  }

}