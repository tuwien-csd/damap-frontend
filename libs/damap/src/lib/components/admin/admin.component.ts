import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from '../../auth/auth.service';
import {
  InternalStorage,
  InternalStorageTranslation,
} from '../../domain/internal-storage';
import { MatDialog } from '@angular/material/dialog';
import { InternalStorageDialogComponent } from './internal-storage-dialog/internal-storage-dialog.component';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { InternalStorageTranslationDialogComponent } from './internal-storage-translation-dialog/internal-storage-translation-dialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'damap-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private dialog: MatDialog,
    private feedbackService: FeedbackService,
  ) {}

  showOnlyActive = true;
  internalStorages: InternalStorage[] = [];
  internalStorageTranslations: InternalStorageTranslation[] = [];
  selectedInternalStorageId: number;
  selectedInternalStorageUrl: string;

  ngOnInit(): void {
    this.selectedInternalStorageId = null;
    this.selectedInternalStorageUrl = null;

    this.backendService.searchInternalStorage({}).subscribe(data => {
      this.internalStorages = data.items;
    });
  }

  async openStorageDialog() {
    const dialogRef = this.dialog.open(InternalStorageDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { mode: 'add' },
    });

    const storage = await firstValueFrom(dialogRef.afterClosed());
    if (storage) {
      this.backendService.createInternalStorage(storage).subscribe(
        () => {
          this.feedbackService.success('http.success.storage.add');
          this.backendService.searchInternalStorage({}).subscribe(data => {
            this.internalStorages = data.items;
            this.selectStorage(data.items.find(s => s.url === storage.url).id);
          });
        },
        error => {
          if (error.error?.message) {
            this.feedbackService.error(error.error.message);
          } else {
            this.feedbackService.error(error.message);
          }
        },
      );
    }
  }

  openTranslationDialog() {
    const dialogRef = this.dialog.open(
      InternalStorageTranslationDialogComponent,
      {
        width: '75%',
        maxWidth: '800px',
        data: { mode: 'add', storageId: this.selectedInternalStorageId },
      },
    );

    dialogRef.afterClosed().subscribe(translation => {
      if (translation) {
        this.backendService
          .createInternalStorageTranslation(translation)
          .subscribe(
            () => {
              this.backendService
                .getAllInternalStorageTranslationsForStorage(
                  this.selectedInternalStorageId,
                )
                .subscribe(data => {
                  this.internalStorageTranslations = data;
                  this.feedbackService.success(
                    'http.success.storage.translations.add',
                  );
                });
            },
            error => {
              if (error.error?.message) {
                this.feedbackService.error(error.error.message);
              } else {
                this.feedbackService.error(error.message);
              }
            },
          );
      }
    });
  }

  selectStorage(storageId: number) {
    if (storageId === null) {
      this.resetStorageSelection();
      return;
    }
    this.backendService.getInternalStorage(storageId).subscribe(storage => {
      this.internalStorages = this.internalStorages.map(s =>
        s.id === storageId ? storage : s,
      );
      this.backendService
        .getAllInternalStorageTranslationsForStorage(storageId)
        .subscribe(data => {
          this.selectedInternalStorageId = storageId;
          this.internalStorageTranslations = data;
          this.selectedInternalStorageUrl = storage.url;
        });
    });
  }

  resetStorageSelection() {
    this.selectedInternalStorageId = null;
    this.internalStorageTranslations = [];
    this.selectedInternalStorageUrl = null;

    this.backendService.searchInternalStorage({}).subscribe(data => {
      this.internalStorages = data.items;
    });
  }
}
