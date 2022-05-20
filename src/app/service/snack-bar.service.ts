import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  durationInSeconds = 4;

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string): void {
    this._snackBar.open(`${message} com sucesso!`, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar','snackbarSuccess']
    });
  }

  warning(message: string): void {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar','snackbarWarning']
    });
  }

  error(message: string = 'Serviço Offline'): void {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar','snackbarError']
    });
  }

}
