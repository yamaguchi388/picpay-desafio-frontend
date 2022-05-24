import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TASK_EMPTY } from 'src/app/shared/constants/task-empty.constant';
import { Task } from 'src/app/shared/models/task.interface';
import { CreateTask, UpdateTask } from 'src/app/shared/state-management/actions/task.actions';

@Component({
  selector: 'app-pagamentos-form',
  templateUrl: './pagamentos-form.component.html',
  styleUrls: ['./pagamentos-form.component.scss']
})
export class PagamentosFormComponent implements OnInit {

  paymentForm: FormGroup;
  task: Task;

  @Input()
  edit: boolean;

  @Output()
  closeModal = new EventEmitter(); 

  constructor(
    private fb: FormBuilder,
    private taskStore: Store<{ task: Task }>
  ) { }

  ngOnInit(): void {
    this.fillForm();
  }

  newForm(task: Task): void {
    this.paymentForm = this.fb.group({
      value: [task.value, { validators: [ Validators.required ] }],
      date: [(new Date(task.date)).toISOString().substring(0, 10), { validators: [ Validators.required ] }],
      username: [task.username, { validators: [ Validators.required, Validators.maxLength(20), Validators.minLength(4) ] }],
      name: [task.name, { validators: [ Validators.required, Validators.maxLength(50), Validators.minLength(4) ] }],
      isPayed: [task.isPayed],
      title: [task.title, { validators: [ Validators.maxLength(50) ] }],
    }); 
  }

  fillForm(): void {
    if(this.edit) {
      this.taskStore.pipe(select('task')).subscribe(
        (task: Task) => {
          this.task = task;
          this.newForm(task);
        }
      );
    }
    else {
      this.newForm(TASK_EMPTY);
    }
  }

  submit(): void {
    const { date, value, title, username, name, isPayed } = this.paymentForm.value;
    const task: Task = {
      id: this.task ? this.task.id : 0,
      date,
      value, 
      title,
      username,
      image: `https://robohash.org/${username}.png?size=150x150&set=set1`,
      isPayed,
      name: name
    }

    if(this.edit) {
      this.updateTask(task);
    }
    else {
      this.createTask(task);
    }
    
    this.closeModal.emit();
  }

  updateTask(task: Task): void {
    this.taskStore.dispatch(UpdateTask({ task }));
  }

  createTask(task: Task): void {
    this.taskStore.dispatch(CreateTask({ task }));
  }

  get value() {
    return this.paymentForm.get('value') as FormControl;
  }

  get title() {
    return this.paymentForm.get('title') as FormControl;
  }

  get date() {
    return this.paymentForm.get('date') as FormControl;
  }

  get username() {
    return this.paymentForm.get('username') as FormControl;
  }

  get isPayed() {
    return this.paymentForm.get('isPayed') as FormControl;
  }

  get name() {
    return this.paymentForm.get('name') as FormControl;
  }

}
