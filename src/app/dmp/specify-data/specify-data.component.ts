import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from '@angular/material/chips';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";

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

  @Input() dmpForm: FormGroup;
  dataSource = new MatTableDataSource();

  readonly tableHeaders: string[] = ['dataset', 'datatype', 'size', 'comment', 'actions'];
  expandedElement: FormArray | null;

  readonly unknown: string = "unknown";
  readonly none: string = "none";
  readonly specify: string = "specify";

  specifyDataStep: FormGroup = this.formBuilder.group({});

  // Mat Chip properties
  selectable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.specifyDataStep = this.dmpForm.get('data') as FormGroup;
    this.specifyDataStep.statusChanges
      .subscribe(() =>
        this.dataSource.data = this.datasets.controls);
  }

  get datasets() {
    return this.specifyDataStep.get('datasets') as FormArray;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add dataset title
    if ((value || '').trim()) {
      this.datasets.push(this.formBuilder.group({
          title: [value, Validators.required],
          publish: [false],
          license: [''],
          start_date: [null],
          type: [null],
          size: [''],
          comment: ['']
        })
      );
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(index: number): void {
    this.datasets.removeAt(index);
  }

  openDatasetDialog(index: number) {

    const dataset = this.datasets.at(index);

    const dialogRef = this.dialog.open(DatasetDialog, {
      width: '600px',
      data: {
        title: dataset.value.title,
        size: dataset.value.size,
        comment: dataset.value.comment,
        type: dataset.value.type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          dataset.patchValue({
            title: result.value.title,
            type: result.value.type,
            size: result.value.size,
            comment: result.value.comment
          });
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
  readonly filetypes = [
    {label: "STANDARD_OFFICE_DOCUMENTS", description: 'text documents, spreadsheets, presentations'},
    {label: "NETWORKBASED_DATA", description: 'websites, email, chat history, etc.'},
    {label: "DATABASES", description: 'DBASE, MS Access, Oracle, MySQL, etc.'},
    {label: "IMAGES", description: 'JPEG, JPEG2000, GIF, TIF, PNG, SVG, etc.'},
    {label: "STRUCTURED_GRAPHICS", description: 'CAD, CAM, 3D, VRML, etc.'},
    {label: "AUDIOVISUAL_DATA", description: 'WAVE, MP3, MP4, Flash, etc.'},
    {label: "SCIENTIFIC_STATISTICAL_DATA", description: 'SPSS, FITS, GIS, etc.'},
    {label: "RAW_DATA", description: 'device specific output'},
    {label: "PLAIN_TEXT", description: 'TXT in various encodings'},
    {label: "STRUCTURED_TEXT", description: 'XML, SGML, etc.'},
    {label: "ARCHIVED_DATA", description: 'ZIP, RAR, JAR, etc.'},
    {label: "SOFTWARE_APPLICATIONS", description: 'modelling tools, editors, IDE, compilers, etc.'},
    {label: "SOURCE_CODE", description: 'scripting, Java, C, C++, Fortran, etc.'},
    {label: "CONFIGURATION_DATA", description: 'parameter settings, logs, library files'},
    {label: "OTHER", description: ''}
  ];
  readonly filesizes = [
    {label: '< 100 MB', min: 0, max: 100000000},
    {label: '100 - 1000 MB', min: 100000000, max: 1000000000},
    {label: '1 - 5 GB', min: 1000000000, max: 5000000000},
    {label: '5 - 20 GB', min: 5000000000, max: 20000000000},
    {label: '20 - 50 GB', min: 20000000000, max: 50000000000},
    {label: '50 - 100 GB', min: 50000000000, max: 100000000000},
    {label: '100 - 500 GB', min: 100000000000, max: 500000000000},
    {label: '500 - 1000 GB', min: 500000000000, max: 1000000000000},
    {label: '1 - 5 TB', min: 1000000000000, max: 5000000000000},
    {label: '5 - 10 TB', min: 5000000000000, max: 10000000000000},
    {label: '10 - 100 TB', min: 10000000000000, max: 100000000000000},
    {label: '100 - 500 TB', min: 100000000000000, max: 500000000000000},
    {label: '500 - 1000 TB', min: 500000000000000, max: 1000000000000000},
    {label: '> 1 PB', min: 1000000000000000, max: undefined},
    {label: 'Don\'t know', min: 0, max: 0}
  ];

  constructor(
    public dialogRef: MatDialogRef<DatasetDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, size: string, comment: string, type: string }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
