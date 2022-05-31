import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from './shared/models/task.model';
import { TaskFormModalComponent } from './task-form-modal/task-form-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  taskAdded = false;

  constructor(private dialog: MatDialog) {}

  openFormDialog(): void {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      this.taskAdded = !!task;
    });
  }
}
