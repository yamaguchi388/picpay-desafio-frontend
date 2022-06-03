import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-modal-delete-task',
  templateUrl: './modal-delete-task.component.html',
  styleUrls: ['./modal-delete-task.component.scss']
})
export class ModalDeleteTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService:TaskService) { }

  ngOnInit() {
  }

  public closeModal(): void{
    this.dialogRef.close();
  }

  public deleteTask(): void{
    this.taskService.deleteTask(this.data.result.id).subscribe(response => {
      this.dialogRef.close('delete');
    });
  }

}
