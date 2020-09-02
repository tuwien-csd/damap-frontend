import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from '@angular/material/chips';
import {Dataset} from "../../model/dataset";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dmp-specify-data',
  templateUrl: './specify-data.component.html',
  styleUrls: ['./specify-data.component.css']
})
export class SpecifyDataComponent implements OnInit {

  readonly unknown: string = "unknown";
  readonly none: string = "none";
  readonly assistance: string = "assistance";

  specifyDataFormGroup: FormGroup;

  // visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  datasets: Dataset[] = [];
  dataKind: string;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.specifyDataFormGroup = new FormGroup({});
  }

  selectKind(kind: string) {
    this.dataKind = kind;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add dataset title
    if ((value || '').trim()) {
      // todo: check if correct
      let newDataset = new Dataset();
      newDataset.setTitle(value.trim());
      this.datasets.push(newDataset);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(datasetTitle: Dataset): void {
    const index = this.datasets.indexOf(datasetTitle);

    if (index >= 0) {
      this.datasets.splice(index, 1);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SpecifyDataDialog, {
      width: '600px', data: this.datasets
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'specify-data-dialog.html',
})

export class SpecifyDataDialog {

  readonly filetypes = [
    { label: "STANDARD_OFFICE_DOCUMENTS", description: 'text documents, spreadsheets, presentations' },
    { label: "NETWORKBASED_DATA", description: 'websites, email, chat history, etc.' },
    { label: "DATABASES", description: 'DBASE, MS Access, Oracle, MySQL, etc.' },
    { label: "IMAGES", description: 'JPEG, JPEG2000, GIF, TIF, PNG, SVG, etc.' },
    { label: "STRUCTURED_GRAPHICS", description: 'CAD, CAM, 3D, VRML, etc.' },
    { label: "AUDIOVISUAL_DATA", description: 'WAVE, MP3, MP4, Flash, etc.' },
    { label: "SCIENTIFIC_STATISTICAL_DATA", description: 'SPSS, FITS, GIS, etc.' },
    { label: "RAW_DATA", description: 'device specific output' },
    { label: "PLAIN_TEXT", description: 'TXT in various encodings' },
    { label: "STRUCTURED_TEXT", description: 'XML, SGML, etc.' },
    { label: "ARCHIVED_DATA", description: 'ZIP, RAR, JAR, etc.' },
    { label: "SOFTWARE_APPLICATIONS", description: 'modelling tools, editors, IDE, compilers, etc.' },
    { label: "SOURCE_CODE", description: 'scripting, Java, C, C++, Fortran, etc.' },
    { label: "CONFIGURATION_DATA", description: 'parameter settings, logs, library files' },
    { label: "OTHER", description: '' }
  ];
  readonly filesizes = [
      { label: '< 100 MB', min: 0, max: 100000000 },
      { label: '100 - 1000 MB', min: 100000000, max: 1000000000 },
      { label: '1 - 5 GB', min: 1000000000, max: 5000000000 },
      { label: '5 - 20 GB', min: 5000000000, max: 20000000000 },
      { label: '20 - 50 GB', min: 20000000000, max: 50000000000 },
      { label: '50 - 100 GB', min: 50000000000, max: 100000000000 },
      { label: '100 - 500 GB', min: 100000000000, max: 500000000000 },
      { label: '500 - 1000 GB', min: 500000000000, max: 1000000000000 },
      { label: '1 - 5 TB', min: 1000000000000, max: 5000000000000 },
      { label: '5 - 10 TB', min: 5000000000000, max: 10000000000000 },
      { label: '10 - 100 TB', min: 10000000000000, max: 100000000000000 },
      { label: '100 - 500 TB', min: 100000000000000, max: 500000000000000 },
      { label: '500 - 1000 TB', min: 500000000000000, max: 1000000000000000 },
      { label: '> 1 PB', min: 1000000000000000, max: undefined },
      { label: 'Don\'t know', min: 0, max: 0 }
    ];

  constructor(
    public dialogRef: MatDialogRef<SpecifyDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dataset[]) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDistribution

}

