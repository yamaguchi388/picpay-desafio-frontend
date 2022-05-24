import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/pagination.interface';
import { Task } from 'src/app/shared/models/task.interface';
import { TasksIndex } from 'src/app/shared/models/tasks-index.interface';
import { GoToPage, NextPage, PreviousPage } from 'src/app/shared/state-management/actions/pagination.actions';
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
  tasks: Task[] = [];

  constructor(
    private tasksStore: Store<{ tasks: TasksIndex }>,
    private paginationStore: Store<{ pagination: Pagination }>
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksStore.pipe(select('tasks')).subscribe(
      ({ tasks }: TasksIndex) => {
        this.tasks = tasks;
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
    this.paginationStore.pipe(select('pagination')).subscribe(
      ({page, limit}: Pagination) => {
        this.pagination.page = page;
        this.pagination.limit = limit;
        this.tasksStore.dispatch(LoadTasks({ page, limit }));
      }
    );
  }
}