import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TasksService } from 'src/services/tasks/tasks.service';

export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
    selector: 'dialog-delete',
    templateUrl: 'dialog-delete.component.html',
    styleUrls: ['./dialog-delete.component.scss']
  })
  export class DialogDelete  implements OnInit {
    dialogItems: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog,  private tasksService: TasksService) {}

    
    ngOnInit(): void {
        this.dialogItems = this.tasksService.currentPayment;
    }

    closeDialog(){
        this.dialog.closeAll();
    }

    deleteItem(item){
        this.tasksService.delete(item.id);
        this.closeDialog();
       
    }

  }