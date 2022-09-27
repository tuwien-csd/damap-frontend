import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {DataSource} from '../../../../domain/enum/data-source.enum';
import {DatasetDialogComponent} from '../dataset-dialog/dataset-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Dataset} from '../../../../domain/dataset';

@Component({
  selector: 'app-dataset-table',
  templateUrl: './dataset-table.component.html',
  styleUrls: ['./dataset-table.component.css']
})
export class DatasetTableComponent {

  @Input() datasets: UntypedFormArray;
  @Input() sourceType: DataSource = DataSource.NEW;

  @Input() tableHeaders: string[] = ['dataset', 'actions'];
  @Input() tableHeading: 'dmp.steps.data.specify.table.heading.default';
  @Input() tableIntro: 'dmp.steps.data.specify.intro.default';

  @Output() removeDataset = new EventEmitter<number>();
  @Output() updateDataset = new EventEmitter<{ index: number, update: Dataset }>();

  readonly datasetSource: any = DataSource;

  constructor(public dialog: MatDialog) {
  }

  openDatasetDialog(dataset: Dataset) {

    const index = this.findFormArrayIndex(dataset);
    const datasetGroup = this.datasets.at(index) as UntypedFormGroup;
    const dialogRef = this.dialog.open(DatasetDialogComponent, {
      width: '75%',
      maxWidth: '800px',
      data: {dataset: datasetGroup.getRawValue(), mode: 'edit'}
    });

    dialogRef.afterClosed().subscribe(update => {
        if (update) {
          this.updateDataset.emit({index, update});
        }
      }
    );
  }

  remove(dataset: Dataset): void {
    const index = this.findFormArrayIndex(dataset);
    this.removeDataset.emit(index);
  }

  private findFormArrayIndex(dataset: Dataset): number {
    return this.datasets.value.findIndex(d => d.id ? d.id === dataset.id : d.referenceHash === dataset.referenceHash);
  }

}
