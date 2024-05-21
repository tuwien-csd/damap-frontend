import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { DataQualityType } from '../../../domain/enum/data-quality-type.enum';
import { FloatLabelType } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MetadataDialogInfoComponent } from '../../../shared/question-dialogs/metadata-dialog-info.component';
import { ValidationDialogInfoComponent } from '../../../shared/question-dialogs/validation-dialog-info.component';

@Component({
  selector: 'app-dmp-doc-data-quality',
  templateUrl: './doc-data-quality.component.html',
  styleUrls: ['./doc-data-quality.component.css'],
})
export class DocDataQualityComponent {
  @Input() docDataStep: UntypedFormGroup;

  optionsMetadata: string[] = [
    'We will be using the following domain specific metadata standards:…',
    'As there are no domain specific metadata standards applicable, we will provide a README file with an explanation of all values and terms used [at file level/at dataset level/at project level]',
  ];
  optionsDataGeneration: string[] = [
    'Specific software will be used to process the raw data',
    'Specific software will be used to conduct statistics',
    'Specific software will be used to create graphical representations',
    'Specific software will be used to make drawings',
  ];
  optionsStructureAndVersioning: string[] = [
    'The filenames will follow the projects naming convention as defined in [add document name] and include a timestamp of creation. Version control is automated.',
    'The respective work package leader will handle the structure and versioning of the research data.',
  ];

  optionsStructureAndVersioningPlaceholder: string[] = [
    'e.g. “Files will be organized as following (Folder Structure): One main folder will exist (‘FWF-7589’).',
    'Within this main folder, there will be subfolders for ‘Results’, ‘Data analysis’ and ‘Output’, termed either ‘7589_results’, ’7589_analysis’, and ’7589_output’.” ',
  ];

  optionsConventionPlaceholder: string =
    '.g. “Files will be saved according to the following naming convention: [date in ISO format YYYYMMDD]_[project prefix]_[experimental  identifier]_[initials of the researcher], for instance ‘20231021_FWF7589_TFA_TM.xlsx’.” ';

  optionsVersionPlaceholder: string =
    'e.g. “If several versions of the same data files will be performed, the individual files will be extended by v1, v2 and so forth, for instance ‘20231021_FWF7589_TFA_TM_v2.xlsx’.”';

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options: UntypedFormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.options = this._formBuilder.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  readonly translateDataQualityPrefixEnum = 'enum.dataquality.';

  readonly dataQualityOptions: any = DataQualityType;

  originalOrder = (): number => 0;

  openMetadataDialog() {
    this.dialog.open(MetadataDialogInfoComponent).afterClosed().subscribe();
  }

  openDocumentationDialog() {
    this.dialog.open(ValidationDialogInfoComponent).afterClosed().subscribe();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  get metadata(): UntypedFormControl {
    return this.docDataStep.get('metadata') as UntypedFormControl;
  }

  get documentation(): UntypedFormControl {
    return this.docDataStep.get('documentation') as UntypedFormControl;
  }

  get structure(): UntypedFormControl {
    return this.docDataStep.get('structure') as UntypedFormControl;
  }

  get isOtherDataQualitySelected() {
    return this.docDataStep.controls.dataQuality.value?.includes(
      DataQualityType.OTHERS,
    );
  }

  get otherDataQuality(): UntypedFormControl {
    return this.docDataStep.get('otherDataQuality') as UntypedFormControl;
  }
}
