import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TASK_EMPTY } from 'src/app/shared/constants/task-empty.constant';
import { Pagination } from 'src/app/shared/models/pagination.interface';
import { Task } from 'src/app/shared/models/task.interface';
import { TasksIndex } from 'src/app/shared/models/tasks-index.interface';
import { Start, Stop } from 'src/app/shared/state-management/actions/loading.actions';
import { GoToPage, NextPage, PreviousPage, SetTotal } from 'src/app/shared/state-management/actions/pagination.actions';
import { AddTask } from 'src/app/shared/state-management/actions/task.actions';
import { LoadTasks } from 'src/app/shared/state-management/actions/tasks.actions';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit {

  pagination: Pagination = {
    limit: 5,
    page: 1,
    total: 0
  };
  empty: Task = TASK_EMPTY;
  tasks: Task[] = [];
  columns = [
    {
      name: 'username',
      direction: 1,
      title: 'Usuário'
    },
    {
      name: 'title',
      direction: 1,
      title: 'Título'
    },
    {
      name: 'date',
      direction: 1,
      title: 'Data'
    },
    {
      name: 'value',
      direction: 1,
      title: 'Valor'
    },
    {
      name: 'isPayed',
      direction: 1,
      title: 'Pago'
    }
  ];
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;
  edit: boolean = false;

  constructor(
    private tasksStore: Store<{ tasks: TasksIndex }>,
    private taskStore: Store<{ task: Task }>,
    private paginationStore: Store<{ pagination: Pagination }>,
    private loadingStore: Store<{ loading: boolean }>
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksStore.pipe(select('tasks')).subscribe(
      ({ tasks, total }: TasksIndex) => {
        const pagination: Pagination = {
          limit: this.pagination.limit,
          page: this.pagination.page,
          total
        }
        this.pagination = pagination;
        this.tasks = tasks;

        this.loadingStore.dispatch(Stop());
      }
    );
  }

  goToPage(page: number): void {
    this.paginationStore.dispatch(GoToPage({ page, limit: this.pagination.limit }));
    this.loadTasks();
  }

  nextPage(): void {
    this.paginationStore.dispatch(NextPage({ limit: this.pagination.limit }));
    this.loadTasks();
  }

  previousPage(): void {
    this.paginationStore.dispatch(PreviousPage({ limit: this.pagination.limit }));
    this.loadTasks();
  }

  changeLimit(limit: number): void {
    this.paginationStore.dispatch(GoToPage({ page: this.pagination.page, limit }));
    this.loadTasks();
  }

  loadTasks(): void {
    this.loadingStore.dispatch(Start());
    this.paginationStore.pipe(select('pagination')).subscribe(
      ({page, limit}: Pagination) => {
        this.pagination.page = page;
        this.pagination.limit = limit;
        this.tasksStore.dispatch(LoadTasks({ page, limit }));
      }
    );
  }

  loadTasksWithUser(username: string): void {
    this.loadingStore.dispatch(Start());
    if(username === '') {
      this.loadTasks();
    }
    else {
      this.paginationStore.pipe(select('pagination')).subscribe(
        ({page, limit}: Pagination) => {
          this.pagination.page = page;
          this.pagination.limit = limit;
          this.tasksStore.dispatch(LoadTasks({ page, limit, username }));
        }
      );
    }
  }

  orderBy(by: string): void {
    let order: number = this.columns.filter(x => x.name === by)[0].direction;

    let sorted: Task[] = [...this.tasks];
    sorted.sort((a, b) => {
      return a[by] > b[by] ? 1 * order : -1 * order;
    });
    this.tasks = sorted;

    this.columns.map(x => {
      x.name === by ? x.direction *= -1 : x.direction = 1;
    });
  }

  deleteModal(task: Task): void {
    this.storeTask(task);
    this.showDeleteModal = true;
  }

  editModal(task: Task): void {
    this.storeTask(task);
    this.edit = true;
    this.showEditModal = true;
  }

  addModal(): void {
    this.edit = false;
    this.showEditModal = true;
  }

  closeModals(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;

    this.loadTasks();
  }

  storeTask(task: Task): void {
    this.taskStore.dispatch(AddTask({ task }))
  }
}