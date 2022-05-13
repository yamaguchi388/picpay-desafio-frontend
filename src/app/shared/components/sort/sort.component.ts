import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Output() sortEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSort() {
    this.sortEvent.emit();
  }
}