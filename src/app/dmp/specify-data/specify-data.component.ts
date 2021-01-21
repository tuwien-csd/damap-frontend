import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataKind} from '../../domain/enum/data-kind.enum';
import {FILE_SIZES, FILE_TYPES} from './data-specs';

@Component({
  selector: 'app-dmp-specify-data',
  templateUrl: './specify-data.component.html',
  styleUrls: ['./specify-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SpecifyDataComponent implements OnInit {

  @Input() specifyDataStep: FormGroup;
  @Input() datasets: FormArray;

  @Output() createDataset = new EventEmitter<string>();
  @Output() updateDataset = new EventEmitter<any>();
  @Output() removeDataset = new EventEmitter<number>();

  dataSource = new MatTableDataSource();
  readonly tableHeaders: string[] = ['dataset', 'datatype', 'size', 'comment', 'actions'];
  expandedElement: FormArray | null;

  readonly unknown: DataKind = DataKind.UNKNOWN;
  readonly none: DataKind = DataKind.NONE;
  readonly specify: DataKind = DataKind.SPECIFY;

  // Mat Chip properties
  selectable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.specifyDataStep.statusChanges
      .subscribe(() => this.dataSource.data = this.datasets.controls);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add dataset
    if ((value || '').trim()) {
      this.createDataset.emit(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    this.removeDataset.emit(index);
  }

  openDatasetDialog(index: number) {

    const dataset = this.datasets.at(index);

    const dialogRef = this.dialog.open(DatasetDialog, {
      width: '600px',
      data: {
        title: dataset.value.title,
        type: dataset.value.type,
        size: dataset.value.size,
        comment: dataset.value.comment
      }
    });

    dialogRef.afterClosed().subscribe(update => {
        if (update) {
          this.updateDataset.emit({index, update});
        }
      }
    );
  }

}

@Component({
  selector: 'dataset-dialog',
  templateUrl: 'dataset-dialog.html',
  styleUrls: ['./specify-data.component.css']
})

export class DatasetDialog {

  dataset = this.fb.group({
    title: [this.data.title, Validators.required],
    type: [this.data.type],
    size: [this.data.size],
    comment: [this.data.comment]
  })
  readonly FILE_TYPES = FILE_TYPES;
  readonly FILE_SIZES = FILE_SIZES;

  constructor(
    public dialogRef: MatDialogRef<DatasetDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, size: string, comment: string, type: string }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
