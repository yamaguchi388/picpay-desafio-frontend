
import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import { TasksService } from 'src/services/tasks/tasks.service';

export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector: 'dialog-edit',
    templateUrl: 'dialog-edit.component.html',
    styleUrls: ['./dialog-edit.component.scss']
  })
  export class DialogEdit implements OnInit {
      dialogItems = {
          name: '',
          date: '',
          value: '',
          title: ''
      };

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog,  private tasksService: TasksService) {}

    ngOnInit(): void {}

    handleInput(event){
        this.dialogItems[event.target.name] = event.target.value;
        // this.dialog.open(DialogEdit, {
        //     data: {details: this.dialogItems}
        // })
        debugger;
    }

    closeDialog(){
        this.dialog.closeAll();
    }

    onSubmit(items){
        this.tasksService.updatePaymentItem(items);
        this.dialog.closeAll();
    }
  }