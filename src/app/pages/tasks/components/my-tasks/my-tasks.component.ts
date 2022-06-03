import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';
import { ModalDeleteTaskComponent } from '../modal-delete-task/modal-delete-task.component';
import { ModalTaskComponent } from '../modal-task/modal-task.component';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  filterForm = new FormGroup({
    name: new FormControl(''),
  });
  filter: boolean = false;
  tasks: Task[] = [];
  options: Task[] = [];
  filteredOptions: Observable<Task[]> | undefined;
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'isPayed', 'actions'];
  totalItems: number;
  itemsPerPage: number = 10;
  pageIndex: number = 1;

  constructor(private taskService: TaskService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllTasks();  
    this.filteredOptions = this.filterForm.get('name')?.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterResult(value)));
  }

  public nextPage(): void {
    this.pageIndex = this.paginator.pageIndex + 1;
    this.itemsPerPage = this.paginator.pageSize;
    this.getTasks();
  }

  private getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(response => {
      this.options = response;
      this.totalItems = response.length;
    });
    this.getTasks();
  }

  private getTasks(): void {
    this.taskService.getAllTasks(this.pageIndex, this.itemsPerPage).subscribe(response => {
      this.tasks = response;
    });
  }

  private filterResult(value: string): Task[] {
    let filterValue: string;
    value ? filterValue = value.toLowerCase() : null;
    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  public sendFilter(): void {
    this.filter = true;
    this.options.forEach((result: any)=> {
      if(result.name === this.filterForm.get('name')?.value){ 
        this.taskService.getTaskById(result.id).subscribe(response => {
          this.tasks = [];
          this.tasks.push(response);
        });     
      } 
    });
  }

  public cleanFilter(): void {
    this.filterForm.reset();
    this.filter = false;
    this.options = [];
    this.getAllTasks();
  }

  public addTask(): void {
    let dialogAddTask = this.dialog.open(ModalTaskComponent,{
      width: '770px',
      height: '440px',
      data:{
        title: 'Adicionar pagamento',
      }
    });

    dialogAddTask.afterClosed().subscribe(response => {
      if(response){
        this.getAllTasks();
      }
    }); 
  }

  public getTaskById(paymentId: number, type: string): void {
    this.taskService.getTaskById(paymentId).subscribe(response => {
      if(type === 'edit'){
        this.editTask(response);
        return;
      } else {
        this.deleteTask(response);
      }
    });
  }

  private editTask(data: Task): void {
    let dialogEditTask = this.dialog.open(ModalTaskComponent,{
      width: '770px',
      height: '440px',
      data: {
        result: data,
        edit: true,
        title: 'Editar pagamento',
      }
    });

    dialogEditTask.afterClosed().subscribe(response => {
      if(response){
        this.getAllTasks();
      }
    });  
  }

  private deleteTask(data: Task): void {
    let dialogDeleteTask = this.dialog.open(ModalDeleteTaskComponent,{
      width: '400px',
      height: '300px',
      data: {
        result: data,
      }
    });

    dialogDeleteTask.afterClosed().subscribe(response => {
      if(response){
        this.getAllTasks();
      }
    });  
  }

}
