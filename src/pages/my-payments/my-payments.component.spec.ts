import { HttpClient } from '@angular/common/http';
import { MyPaymentsComponent } from './my-payments.component';

import {MatDialog} from '@angular/material/dialog';
import { TasksService } from 'src/services/tasks/tasks.service';


describe('MyPaymentsComponent', () => {
   let tasksService: TasksService;
   let http : HttpClient;
   let dialog: MatDialog
   let component = new MyPaymentsComponent(tasksService, dialog);

  beforeEach(() => {
    tasksService = new TasksService(http);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
