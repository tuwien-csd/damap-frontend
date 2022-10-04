import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _snackBar: MatSnackBar,
              private translate: TranslateService) {
  }

  error(message: string) {
    this.translate.get(message).subscribe(translation =>
      this._snackBar.open(translation, 'x', {
        duration: 4500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snack-error'
      }));
  }

  success(message: string) {
    this.translate.get(message).subscribe(translation =>
      this._snackBar.open(translation, 'x', {
        duration: 4500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snack-success'
      }));
  }
}
