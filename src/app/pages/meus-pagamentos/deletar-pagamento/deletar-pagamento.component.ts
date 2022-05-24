import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Task } from 'src/app/shared/models/task.interface';
import { DeleteTask } from 'src/app/shared/state-management/actions/task.actions';

@Component({
  selector: 'app-deletar-pagamento',
  templateUrl: './deletar-pagamento.component.html',
  styleUrls: ['./deletar-pagamento.component.scss']
})
export class DeletarPagamentoComponent implements OnInit {

  task: Task;

  @Output()
  closeModal = new EventEmitter();

  constructor(
    private taskStore: Store<{ task: Task }>,
  ) { }

  ngOnInit(): void {
    this.taskStore.pipe(select('task')).subscribe(
      (task: Task) => {
        this.task = task;
      }
    );
  }

  deleteTask(id: number): void {
    this.taskStore.dispatch(DeleteTask({ id }));
    this.closeModal.emit();
  }
}
