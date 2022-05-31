import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { TaskFormModalComponent } from './task-form-modal/task-form-modal.component';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [MatDialogModule],
      providers: [MatDialog],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialog open', () => {
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);

    component.openFormDialog();
    expect(component['dialog'].open).toHaveBeenCalledWith(
      TaskFormModalComponent,
      { width: '700px' }
    );
  });

  it('should change taskAdded value', () => {
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);

    component.openFormDialog();
    expect(component.taskAdded).toBeTrue();
  });
});
