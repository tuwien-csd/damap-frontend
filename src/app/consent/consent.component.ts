import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'consent-dialog',
  templateUrl: './consent-dialog.html',
  styleUrls: ['./consent.component.css']
})

export class ConsentDialog {
  constructor(public dialogRef: MatDialogRef<ConsentDialog>) {}

//   dialogRef.afterClosed().subscribe(result => {
//         console.log(`Dialog result: ${result}`);
//       });

  onNoClick(): void {
    this.dialogRef.close();
  };
}
