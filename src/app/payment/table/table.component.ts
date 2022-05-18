import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  user: string;
  title: string;
  date: string;
  value: number;
  isPayed: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { user: "gabriel", title: 'Professor gen', date: '2020-07-21T05:53:20Z', value: 100, isPayed: true },
  { user: "gabriel", title: 'Professor m', date: '2020-07-21T05:53:20Z', value: 100, isPayed: true },
  { user: "gabriel", title: 'Professor um', date: '2020-07-21T05:53:20Z', value: 100, isPayed: true },
  { user: "gabriel", title: 'Professor lium', date: '2020-07-21T05:53:20Z', value: 100, isPayed: true },
  { user: "gabriel", title: 'Professor', date: '2020-07-21T05:53:20Z', value: 100, isPayed: true }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
