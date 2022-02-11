import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {BackendService} from '../services/backend.service';
import {Consent} from '../domain/consent'

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})

export class ConsentComponent{
  public lang = 'EN';
  public consent : Consent;

  constructor(private backendService: BackendService, public dialogRef: MatDialogRef<ConsentComponent>, private translate: TranslateService) {}

  useLanguage(language: string): void {
    this.lang = language.toUpperCase();
    this.translate.use(language);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
