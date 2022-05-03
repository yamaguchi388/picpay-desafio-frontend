import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSearch, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import { AppService } from '../app.service';
import { ModalDeleteTaskComponent } from '../modals/modal-delete-task/modal-delete-task.component';
import { ModalAddUpdateTaskComponent } from '../modals/modal-add-update-task/modal-add-update-task.component';
import { Task } from '../classes/Task';
import { StringUtil } from '../utils/StringUtil'
import { DateUtil } from '../utils/DateUtil';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch;
  faFilter = faFilter;
  faXmark  = faXmark;

  bsModalRef?: BsModalRef | null;

  searchBy: string;
  limit: number;
  limitRange: number[] = [];
  sortBy: string;
  order: 'asc' | 'desc';

  totalTasks: number;
  currentPage: number;
  hasFilters: boolean;

  tasks: Task[] = [];

  constructor(private appService: AppService, private toastr: ToastrService, private modalService: BsModalService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.validUserIsLogedIn();
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

  openAddUpdateModal(type: 'add' | 'update', task = {}) {
    const initialState: ModalOptions  = {
      initialState: {
        type: type,
        task: task
      },
    };

    this.bsModalRef = this.modalService.show(ModalAddUpdateTaskComponent, initialState);

    if (this.bsModalRef.onHide) {
      this.bsModalRef.onHide.subscribe(event => {
        this.searchTasks();
      })
    }
  }

  openDeleteTaskModal(task: Task) {
    const initialState: ModalOptions  = {
      initialState: {
        task: task
      },
      class: 'modal-sm'
    };

    this.bsModalRef = this.modalService.show(ModalDeleteTaskComponent, initialState);

    if (this.bsModalRef.onHide) {
        this.bsModalRef.onHide.subscribe(event => {
          // console.log(event);
          this.searchTasks();
        })
    }
  }

  updatePayed(task: Task) {
    task.isPayed = !task.isPayed;
    this.appService.updateTask(task);
  }

  cleanFiltersAndSearch() {
    this.hasFilters  = false;
    this.sortBy      = '';
    this.searchBy    = '';
    this.limit       = 5;
    this.currentPage = 1;

    this.searchTasks();
  }

  sortTable(field: string) {
    if (field === this.sortBy) {
      if (this.order === 'asc') {
        this.order = 'desc';
      } else {
        this.order = 'asc';
      }

    } else {
      this.order = 'asc';
    }

    this.sortBy = field;
    this.searchTasks();
  }

  formatDate(date: string) {
    const options: any = {
      dateStyle: "medium"
    }

    return DateUtil.stringDateToLocaleString(date, options);
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
    return StringUtil.formatValue(value);
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
    this.hasFilters = false;
    let queryParams = '';

    if (this.sortBy && this.sortBy.length > 0) {
      queryParams += '?_sort=' + this.sortBy + '&_order=' + this.order
    }

    if (this.searchBy && this.searchBy.length > 0) {
      queryParams += this.getQueryParamSeparator(queryParams);
      queryParams += 'name_like=' + this.searchBy.trim(); // quando busca pelo nome não utiliza paginação
      this.hasFilters = true;
    }

    if (!this.hasFilters) {
      queryParams += this.getQueryParamSeparator(queryParams);
      queryParams += '_page=' + this.currentPage + '&_limit=' + this.limit;
    }

    return queryParams;
  }

  private getQueryParamSeparator(queryParams: string) {
    return queryParams.length > 0 ? '&' : '?'
  }

  private validUserIsLogedIn() {
    const email = localStorage.getItem('email');
    if (!email) {
      this.toastr.error('Você deve estar logado para acessar essa página!');
      this.router.navigateByUrl('sign-in');
    }
  }

}
