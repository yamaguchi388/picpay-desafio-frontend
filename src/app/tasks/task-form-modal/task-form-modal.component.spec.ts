import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { tasksMock } from '../shared/mocks/task.mock';
import { TaskService } from '../shared/services/task.service';
import { TaskFormModalComponent } from './task-form-modal.component';

describe('TaskFormModalComponent', () => {
  let component: TaskFormModalComponent;
  let fixture: ComponentFixture<TaskFormModalComponent>;
  const dialogMock: jasmine.SpyObj<MatDialogRef<TaskFormModalComponent>> =
    jasmine.createSpyObj<MatDialogRef<TaskFormModalComponent>>('MatDialogRef', {
      close: undefined,
    });

  const taskService: jasmine.SpyObj<TaskService> =
    jasmine.createSpyObj<TaskService>('TaskService', {
      getAll: of(tasksMock),
      getTotalCount: of(tasksMock.length),
      create: of(tasksMock[0]),
      update: of(tasksMock[0]),
      delete: of(undefined),
    });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormModalComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: TaskService,
          useValue: taskService,
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        { provide: MAT_DIALOG_DATA, useValue: tasksMock[0] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill form if task is provide', () => {
    component.task = tasksMock[0];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.form.value).toEqual({
      name: component.task.name,
      date: component.task.date,
      title: component.task.title,
      value: component.task.value,
    });
  });

  it('should call update if task already exists', () => {
    component.task = tasksMock[0];
    component.form.get('name').setValue('TESTE');
    component.submitForm();
    fixture.detectChanges();
    expect(component['taskService'].update).toHaveBeenCalledWith({
      ...component.form.value,
      name: 'TESTE',
      id: 1,
    });
  });

  it('should call create if task does not exists', () => {
    component.task = null;
    component.form.setValue({
      name: tasksMock[0].name,
      date: tasksMock[0].date,
      title: tasksMock[0].title,
      value: tasksMock[0].value,
    });
    component.submitForm();
    fixture.detectChanges();
    expect(component['taskService'].create).toHaveBeenCalledWith(
      component.form.value
    );
  });
});
