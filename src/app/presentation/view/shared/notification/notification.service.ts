import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  snackBarRef!: MatSnackBarRef<NotificationComponent>;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message: string, action: string, duration: number = 5000): void {
    this.snackBar.open(message, action, {
      duration
    });
  }
}
