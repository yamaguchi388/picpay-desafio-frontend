import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string) {
    this._snackBar.open(message, null, {
      panelClass: 'snack-success',
      duration: 5000
    })
  }

  error(message: string) {
    this._snackBar.open(message, null, {
      panelClass: 'snack-error',
      duration: 5000
    })
  }
}
