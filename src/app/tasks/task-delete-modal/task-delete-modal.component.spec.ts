import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { TaskService } from '../shared/services/task.service';
import { TaskDeleteModalComponent } from './task-delete-modal.component';

describe('TaskDeleteModalComponent', () => {
  let component: TaskDeleteModalComponent;
  let fixture: ComponentFixture<TaskDeleteModalComponent>;
  const dialogMock: jasmine.SpyObj<MatDialogRef<TaskDeleteModalComponent>> =
    jasmine.createSpyObj<MatDialogRef<TaskDeleteModalComponent>>(
      'MatDialogRef',
      { close: undefined }
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDeleteModalComponent],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        TaskService,
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete()', () => {
    it('should close with true if success', () => {
      spyOn(component['taskService'], 'delete').and.returnValue(of(undefined));

      component.deleteTask();
      fixture.detectChanges();

      expect(component['dialogRef'].close).toHaveBeenCalledWith(true);
    });

    it('should close with false if error', () => {
      spyOn(component['taskService'], 'delete').and.returnValue(
        throwError('ERROR')
      );

      component.deleteTask();
      fixture.detectChanges();

      expect(component['dialogRef'].close).toHaveBeenCalledWith(false);
    });
  });
});
