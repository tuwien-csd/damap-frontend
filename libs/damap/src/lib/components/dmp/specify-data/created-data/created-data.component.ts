import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {AbstractBaseDataComponent} from '../abstract-base-data.component';
import {DatasetDialogComponent} from "../dataset-dialog/dataset-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-created-data',
  templateUrl: './created-data.component.html',
  styleUrls: ['./created-data.component.css']
})
export class CreatedDataComponent extends AbstractBaseDataComponent {

  @Input() fileUpload: { file: File, progress: number, finalized: boolean }[];

  @Output() fileToAnalyse = new EventEmitter<File>();
  @Output() uploadToCancel = new EventEmitter<number>();

  readonly tableHeaders: string[] = ['dataset', 'datatype', 'size', 'description', 'actions'];

  constructor(public dialog: MatDialog) {
    super();
  }

  openDatasetDialog() {
    const dialogRef = this.dialog.open(DatasetDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: {dataset: {source: this.datasetSource.NEW}}
    });

    dialogRef.afterClosed().subscribe(dataset => {
        if (dataset) {
          this.datasetToAdd.emit(dataset);
        }
      }
    );
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
