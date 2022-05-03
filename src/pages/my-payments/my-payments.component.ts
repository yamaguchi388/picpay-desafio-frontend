import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { PaymentData } from 'src/models/PaymentData';
@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {
  @Input() length: String = '';
  @Input() pageSizeOptions: Array<[Number]> = [];
  dataSource: Array<PaymentData> = [{
    user: 'Guilherme',
    title: 'Professor 1',
    date: '23 Jun 2020',
    value: 100,
    isPaid: true,
  },
  {
    user: 'Jose',
    title: 'Professor 2',
    date: '17 Jun 2008',
    value: 50,
    isPaid: false,
  }];
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'paid'];
  // dataSource: MatTableDataSource<UserData> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  input = {
    value: 'carro'
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}