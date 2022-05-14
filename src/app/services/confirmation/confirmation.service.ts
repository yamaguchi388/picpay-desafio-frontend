import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ConfirmationDialogComponent,
} from 'src/app/presentation/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private readonly matDialog: MatDialog) {}

  openConfirmationDialog({ message, title }: { title: string; message: string }): Observable<any>{
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '200px',
    });
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.title = title;
    return dialogRef.afterClosed();
  }
}
