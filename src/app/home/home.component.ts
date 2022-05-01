import { Component, OnInit } from '@angular/core';

import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchBy: string = '';
  limit: number = 5;

  totalItems = 70;
  currentPage = 1;

  faSearch = faSearch;
  faFilter = faFilter;

  constructor() { }

  ngOnInit(): void {
  }

  searchPayments() {
    console.log('searchPayments');
    
  }

}
