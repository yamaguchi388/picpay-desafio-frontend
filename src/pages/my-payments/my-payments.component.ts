import { subject, totalTaskItems } from './../../services/tasks/tasks.service';
import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogEdit } from './../../components/molecules/dialog/dialog-edit/dialog-edit.component';

import { PaymentData } from 'src/models/PaymentData';
import { TasksService } from 'src/services/tasks/tasks.service';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent implements OnInit {
  pageSizeOptions: Array<number> = [5, 10, 50, 100];
  dataSource: Array<PaymentData> = [];
  length: number = 0;
  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'payed', 'edit', 'remove'];
  dialogDelete = {};
  dialogEdit = {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  input = {
    value: 'carro'
  }

  constructor(
     private tasksService: TasksService,
     public dialog: MatDialog
     ) { }

  ngOnInit(): void {
    this.tasksService.getTotalTaskItems();
    this.tasksService.getTaskApi();
    subject.subscribe((data) => {
      this.dataSource = this.dataSource.concat(data);
    })

    totalTaskItems.subscribe((total) => {
      this.length = total;
    });

  }

  handlePageEvent(event){
    if(event.pageSize !== this.tasksService.limitItems){
      this.tasksService.setLimitItems(event.pageSize);
    }

    if((event.pageIndex + 1) !== this.tasksService.currentPage){
      this.tasksService.setCurrentPage(event.pageIndex + 1);
    }
  
    subject.subscribe((data) => {
      this.dataSource = data;
      debugger;
    })
  }

  deleteItem(item){
    this.tasksService.delete(item.id);
    subject.subscribe((data) => {
      debugger;
      this.dataSource = data;
      this.dialog.closeAll();
    });
  }

  setDeleteItem(item: any){
    this.dialogDelete = {details: item, delete: () => this.deleteItem(item), close: () => this.dialog.closeAll()};
  }

  setEditItem(item: any){
    debugger;
    this.tasksService.setCurrentPayment(item);
  }

  openDialog() {
    this.dialog.open(DialogEdit, {
      data: {
        animal: 'panda',
      },
    });
  }

  openDialogDelete() {
    this.dialog.open(DialogDelete, {
      data: this.dialogDelete,
    });

}

}

// export interface DialogData {
//   animal: 'panda' | 'unicorn' | 'lion';
// }

// @Component({
//   selector: 'dialog-edit',
//   templateUrl: 'dialog-edit.html',
// })
// export class DialogEdit {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }
@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

