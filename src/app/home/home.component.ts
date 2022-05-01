import { Component, OnInit } from '@angular/core';

import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../app.service';
import { Task } from '../classes/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  faFilter = faFilter;

  searchBy: string;
  limit: number;
  limitRange: number[] = [];

  totalTasks: number;
  currentPage: number;
  hasFilters: boolean;

  tasks: Task[] = [];

  constructor(private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.searchBy    = '';
    this.limit       = this.getDefaultLimit();
    this.limitRange  = Array(20).fill(0).map((_, i) => i+1);
    this.currentPage = 1;

    this.totalTasks = this.getTotalTasks();
    this.hasFilters = false;

    this.searchTasks();
  }

  searchTasks() {  
    const queryParams = this.filtersToQueryParams();

    this.appService.getTasks(queryParams).then(
      (success: Task[]) => {
        console.log(success);
        this.tasks = [... success];

        if (this.hasFilters) {
          this.totalTasks = this.tasks.length;
          this.limit      = this.tasks.length;
        } else {
          this.totalTasks = this.getTotalTasks();
          this.limit      = this.getDefaultLimit()
        }
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }

  private getTotalTasks() {
    // TODO definir isso
    return 40;
  }

  private getDefaultLimit() {
    return 5;
  }

  private filtersToQueryParams() {
    let queryParams = '?_page=' + this.currentPage + '&_limit=' + this.limit;
    this.hasFilters = false;

    if (this.searchBy.length > 0) {
      queryParams = '?name_like=' + this.searchBy.trim(); // quando busca pelo nome não utiliza paginação
      this.hasFilters = true;
    }

    return queryParams;
  }

}
