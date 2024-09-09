import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalStorage } from '../../domain/internal-storage';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BackendService } from '../../services/backend.service';
import { FeedbackService } from '../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { InternalStorageDialogComponent } from '../../components/admin/internal-storage-dialog/internal-storage-dialog.component';

@Component({
  selector: 'damap-internal-storage-table',
  templateUrl: './internal-storage-table.component.html',
  styleUrls: ['./internal-storage-table.component.css'],
})
export class InternalStorageTableComponent implements AfterViewInit, OnChanges {
  @Output() selectInternalStorage = new EventEmitter<number>();

  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
  ) {}

  @Input() internalStorages: InternalStorage[] = [];
  dataSource = new MatTableDataSource<InternalStorage>();

  readonly tableHeaders: string[] = [
    'url',
    'storageLocation',
    'backupLocation',
    'active',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.internalStorages) {
      this.dataSource.data = this.internalStorages;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: InternalStorage, filter: string) =>
      data.url?.toLowerCase().includes(filter.trim().toLowerCase());
  }

  toggleActivation(id: number) {
    const storage = this.internalStorages.find(s => s.id === id);
    const storageCopy = { ...storage };
    storageCopy.active = !storage.active;
    this.backendService.updateInternalStorage(storageCopy).subscribe(() => {
      this.internalStorages = this.internalStorages.map(s =>
        s.id === id ? storageCopy : s,
      );
      this.dataSource.data = this.internalStorages;
    });
  }

  deleteStorage(id: number) {
    this.backendService.deleteInternalStorage(id).subscribe(
      () => {
        this.internalStorages = this.internalStorages.filter(s => s.id !== id);
        this.dataSource.data = this.internalStorages;
        this.editTranslations(null);
      },
      error => {
        this.feedbackService.error(error.message);
      },
    );
  }

  editStorage(id: number) {
    const storage = this.internalStorages.find(s => s.id === id);

    const dialogRef = this.dialog.open(InternalStorageDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { storage: { ...storage }, mode: 'edit' },
    });

    dialogRef.afterClosed().subscribe(storage => {
      if (storage) {
        this.backendService.updateInternalStorage(storage).subscribe(
          () => {
            this.internalStorages = this.internalStorages.map(s =>
              s.id === storage.id ? storage : s,
            );
            this.dataSource.data = this.internalStorages;
            this.selectInternalStorage.emit(storage.id);
          },
          error => {
            this.feedbackService.error(error.message);
          },
        );
      }
    });
  }

  editTranslations(storageId: number) {
    this.selectInternalStorage.emit(storageId);
  }
}
