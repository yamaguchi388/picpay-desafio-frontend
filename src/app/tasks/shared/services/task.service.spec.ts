import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { tasksMock } from '../mocks/task.mock';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpController: HttpTestingController;
  const snackbarService: jasmine.SpyObj<SnackbarService> =
    jasmine.createSpyObj<SnackbarService>('SnackbarService', {
      openSnackBar: undefined,
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provider: SnackbarService, useValue: snackbarService }],
    });
    service = TestBed.inject(TaskService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tasks', () => {
    service.getTasks({ _limit: 5, _page: 1 }).subscribe((tasks) => {
      expect(tasks).toEqual(tasksMock);
    });

    const queryStringParams = new HttpParams({
      fromObject: { ...{ _limit: 5, _page: 1 } },
    });

    httpController
      .expectOne(service.apiURL + '?' + queryStringParams)
      .flush(tasksMock);
  });

  it('should return count of total tasks', () => {
    service.getTotalTasks({}).subscribe((count) => {
      expect(count).toEqual(tasksMock.length);
    });

    httpController.expectOne(service.apiURL).flush(tasksMock);
  });

  it('should create and return task', () => {
    const [taskMock] = tasksMock;
    service.createTask(taskMock).subscribe((task) => {
      expect(task).toEqual(taskMock);
    });

    httpController.expectOne(service.apiURL).flush(taskMock);
  });

  it('should update and return task', () => {
    const [taskMock] = tasksMock;
    service.updateTask(taskMock).subscribe((task) => {
      expect(task).toEqual(taskMock);
    });

    httpController
      .expectOne(`${service.apiURL}/${taskMock.id}`)
      .flush(taskMock);
  });

  it('should delete task', () => {
    const [taskMock] = tasksMock;
    service.deleteTask(taskMock.id).subscribe();

    httpController.expectOne(`${service.apiURL}/${taskMock.id}`);
  });
});
