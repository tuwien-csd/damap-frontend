import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'consent-dialog',
  templateUrl: './consent-dialog.html',
  styleUrls: ['./consent.component.css']
})

export class ConsentDialog implements OnInit {
  public lang = 'EN';

  constructor(public dialogRef: MatDialogRef<ConsentDialog>, private translate: TranslateService,) {}

  ngOnInit() {}

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  onNoClick(): void {
    this.dialogRef.close();
  };
}
