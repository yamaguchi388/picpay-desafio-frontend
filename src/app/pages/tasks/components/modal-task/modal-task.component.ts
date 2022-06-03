import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {
  
  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    date: new FormControl(Date, [Validators.required]),
    username: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    isPayed: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<ModalTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,) { }

  ngOnInit() {
    this.createForm();
  }
  
  private createForm(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(this.data ? this.data?.result.name : null, [Validators.required]),
      value: new FormControl(this.data ? this.data?.result.value : null, [Validators.required]),
      date: new FormControl(this.data ? this.data?.result.date : null, [Validators.required]),
      username: new FormControl(this.data ? this.data?.result.username : null, [Validators.required]),
      title: new FormControl(this.data ? this.data?.result.title : null, [Validators.required]),
      isPayed: new FormControl(this.data ? this.data?.result.isPayed : null),
    });
  }

  public closeModal(): void {
    this.taskForm.reset();
    this.dialogRef.close();
  }

  public updateTask(): void {
    let update: Task = {};

    this.taskForm.get('name')?.dirty ? update.name = this.taskForm.get('name')?.value : '';
    this.taskForm.get('value')?.dirty ? update.value = this.taskForm.get('value')?.value : '';
    this.taskForm.get('date')?.dirty ? update.date = moment(this.taskForm.get('date')?.value).format() : '';
    this.taskForm.get('username')?.dirty ? update.username = this.taskForm.get('username')?.value : '';
    this.taskForm.get('title')?.dirty ? update.title = this.taskForm.get('title')?.value : '';
    this.taskForm.get('isPayed')?.dirty ? update.isPayed = this.taskForm.get('isPayed')?.value : '';

    this.taskService.updateTask(this.data.result.id, update).subscribe(response => {
      this.dialogRef.close('update');
    });
  }
  
  public newTask(): void {
    this.taskService.postTask(this.taskForm.value).subscribe(response => {
      this.dialogRef.close('add');
    });
  }
}
