import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-task-delete-modal',
  templateUrl: './task-delete-modal.component.html',
  styleUrls: ['./task-delete-modal.component.scss'],
})
export class TaskDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TaskService
  ) {}

  deleteTask(): void {
    this.taskService.delete(this.task.id).subscribe(
      () => this.dialogRef.close(true),
      () => this.dialogRef.close(false)
    );
  }
}
