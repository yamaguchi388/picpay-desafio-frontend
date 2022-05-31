import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { tasksMock } from '../shared/mocks/task.mock';
import { TaskService } from '../shared/services/task.service';
import { TasksListComponent } from './tasks-list.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
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
      declarations: [TasksListComponent],
      imports: [MatDialogModule],
      providers: [
        MatDialog,
        {
          provide: TaskService,
          useValue: taskService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
