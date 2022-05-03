import { UnavailableComponent } from './../../components/unavailable/unavailable/unavailable.component';
import { LoginComponent } from './../../../login/login.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public getErrors(value): void {

    console.log(value);
    const dialogRef = this.dialog.open(UnavailableComponent);

    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );
  }
}
