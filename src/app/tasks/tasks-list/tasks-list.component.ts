import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { TaskDeleteModalComponent } from '../task-delete-modal/task-delete-modal.component';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  taskAdded: boolean;

  displayedColumns: string[] = [
    'username',
    'title',
    'date',
    'value',
    'isPayed',
    'actions',
  ];

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.taskAdded && changes.taskAdded.currentValue) {
      this.getAll();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDeleteModalComponent, {
      width: '350px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((wasDeleted: boolean) => {
      if (wasDeleted) {
        this.getAll();
      }
    });
  }

  openFormDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '700px',
      data: task,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  private getAll(): void {
    this.taskService.getAll().subscribe((tasks) => {
      this.dataSource.data = tasks || [];
    });
  }
}
