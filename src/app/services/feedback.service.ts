import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _snackBar: MatSnackBar) {
  }

  error(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 4500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snack-error'
    });
  }

  success(message: string) {
    this._snackBar.open(message, 'x', {
      duration: 4500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snack-success'
    });
  }
}
