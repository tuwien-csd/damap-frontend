import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { AbstractBaseDataComponent } from '../abstract-base-data.component';
import { DatasetDialogComponent } from '../dataset-dialog/dataset-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Config } from '../../../../domain/config';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-created-data',
  templateUrl: './created-data.component.html',
  styleUrls: [],
})
export class CreatedDataComponent
  extends AbstractBaseDataComponent
  implements OnInit, OnDestroy
{
  @Input() fileUpload: { file: File; progress: number; finalized: boolean }[];
  @Input() config$: Observable<Config>;

  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  fitsServiceAvailable: boolean = false;
  configSubscription: Subscription;

  readonly tableHeaders: string[] = [
    'dataset',
    'datatype',
    'fileFormat',
    'size',
    'description',
    'actions',
  ];

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.configSubscription = this.config$.subscribe(config => {
      this.fitsServiceAvailable = config.fitsServiceAvailable || false;
    });
  }

  ngOnDestroy(): void {
    this.configSubscription.unsubscribe();
  }

  openDatasetDialog() {
    const dialogRef = this.dialog.open(DatasetDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: { dataset: { source: this.datasetSource.NEW } },
    });

    dialogRef.afterClosed().subscribe(dataset => {
      if (dataset) {
        this.datasetToAdd.emit(dataset);
      }
    });
  }

  get kind(): UntypedFormControl {
    return this.specifyDataStep.get('kind') as UntypedFormControl;
  }

  analyseFile(file: File) {
    this.fileToAnalyse.emit(file);
  }

  cancelUpload(index: number) {
    this.uploadToCancel.emit(index);
  }
}
