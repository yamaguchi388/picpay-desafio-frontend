import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/pagination.interface';
import { Task } from 'src/app/shared/models/task.interface';;
import { LoadTasks } from 'src/app/shared/state-management/actions/tasks.actions';

@Injectable({
  providedIn: 'root'
})
export class MeusPagamentosResolver implements Resolve<void> {

  constructor(
    private tasksStore: Store<{ tasks: Task[] }>,
    private paginationStore: Store<{ pagination: Pagination }>
  ) {}

  resolve(): void {
    this.paginationStore.pipe(select('pagination')).subscribe(
      ({ page, limit }: Pagination) => {
        this.tasksStore.dispatch(LoadTasks({ page, limit }));
      }
    )
  }
}
