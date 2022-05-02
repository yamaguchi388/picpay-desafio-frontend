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

  async ngOnInit(): Promise<void> {
    this.searchBy    = '';
    this.limit       = 5;
    this.limitRange  = Array(20).fill(0).map((_, i) => i+1);
    this.currentPage = 1;

    this.totalTasks = await this.getTotalTasks();
    
    this.hasFilters = false;

    this.searchTasks();
  }

  searchTasks() {  
    const queryParams = this.filtersToQueryParams();

    this.appService.getTasks(queryParams).then(
      async (success: Task[]) => {
        this.tasks = [... success];
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }

  openAddNewTaskModal() {
    console.log('openAddNewTaskModal');
  }

  openUpdateTaskModal() {
    console.log('openUpdateTaskModal');
  }

  openDeleteTaskModal() {
    console.log('openDeleteTaskModal');
  }

  updatePayed(task: Task) {
    task.isPayed = !task.isPayed;
    this.appService.updateTask(task);
  }

  formatDate(date: string) {
    const locale = 'pt-br';
    const options: any = {
      dateStyle: "medium"
    }

    return new Date(date).toLocaleDateString(locale, options)
  } 

  formatHour(date: string) {
    const locale = 'pt-br';
    const options: any = {
      timeZone: 'Etc/Universal', // para manter as 3 horas do utc no New Date
      hour12: true,
      hour: '2-digit',
      minute:'2-digit'

    }

    const [_, time, meridiem] = new Date(date).toLocaleDateString(locale, options).split(' ')
    
    return time + ' ' + meridiem;
  }

  formatValue(value: number) {
    return "R$ " + value.toFixed(2).replace('.', ',')
  }

  private async getTotalTasks() {
    let totalTasks = 500; // número alto para garantir que tem todas

    await this.appService.getTasks().then(
      (success: Task[]) => {
        totalTasks = success.length;
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
    return totalTasks;
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
