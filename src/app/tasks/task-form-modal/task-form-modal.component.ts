import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss'],
})
export class TaskFormModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.fillForm();
  }

  submitForm(): void {
    const action = !!this.task
      ? this.taskService.update({ ...this.form.value, id: this.task.id })
      : this.taskService.create(this.form.value);

    action.subscribe();

    this.dialogRef.close(this.form.value);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(0.1)]],
    });
  }

  private fillForm(): void {
    if (this.task) {
      this.form.patchValue(this.task);
    }
  }
}
