import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Task } from 'src/app/shared/models/task.interface';
import { TasksIndex } from 'src/app/shared/models/tasks-index.interface';

@Component({
  selector: 'app-meus-pagamentos',
  templateUrl: './meus-pagamentos.component.html',
  styleUrls: ['./meus-pagamentos.component.scss']
})
export class MeusPagamentosComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private tasksStore: Store<{ tasks: TasksIndex }>
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
}