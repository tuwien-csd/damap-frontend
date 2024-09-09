import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalStorage, InternalStorageTranslation } from '../../domain/internal-storage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BackendService } from '../../services/backend.service';
import { FeedbackService } from '../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { InternalStorageDialogComponent } from '../../components/admin/internal-storage-dialog/internal-storage-dialog.component';
import { InternalStorageTranslationDialogComponent } from '../../components/admin/internal-storage-translation-dialog/internal-storage-translation-dialog.component';

@Component({
  selector: 'damap-internal-storage-translation-table',
  templateUrl: './internal-storage-translation-table.component.html',
  styleUrls: ['./internal-storage-translation-table.component.css'],
})
export class InternalStorageTranslationTableComponent implements AfterViewInit, OnChanges {


  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog
  ) { }

  @Input() internalStorageTranslations: InternalStorageTranslation[] = [];
  @Input() selectedInternalStorageId: number;

  dataSource = new MatTableDataSource<InternalStorageTranslation>();

  readonly tableHeaders: string[] = [
    'languageCode',
    'title',
    'description',
    'backupFrequency',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.internalStorageTranslations) {
      this.dataSource.data = this.internalStorageTranslations;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: InternalStorageTranslation, filter: string) =>
      data.title?.toLowerCase().includes(filter.trim().toLowerCase());
  }

  
  deleteStorageTranslation(id: number) {
    this.backendService.deleteInternalStorageTranslation(id).subscribe(() => {
      this.internalStorageTranslations = this.internalStorageTranslations.filter(t => t.id !== id);
      this.dataSource.data = this.internalStorageTranslations;
    }, error => {
      this.feedbackService.error(error.message);
    });
  }

  editStorageTranslation(id: number) {
    const translation = this.internalStorageTranslations.find(t => t.id === id);
    
    const dialogRef = this.dialog.open(InternalStorageTranslationDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { translation: { ...translation }, mode: 'edit', storageId: this.selectedInternalStorageId },
    });

    dialogRef.afterClosed().subscribe(translation => {
      if (translation) {
        this.backendService.updateInternalStorageTranslation(translation).subscribe(() => {
          this.internalStorageTranslations = this.internalStorageTranslations.map(t => (t.id === translation.id ? translation : t));
          this.dataSource.data = this.internalStorageTranslations;
        }, error => {
          this.feedbackService.error(error.message);
        });
      }
    });
  }
  
}
