import {Injectable, NgModule} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {FormService} from '../../services/form.service';

@Injectable()
export class FormServiceStub {

  get dmpForm() {
    return new FormGroup({
      id: new FormControl(null),
      project: new FormControl(),
      data: new FormGroup({kind: new FormControl('SPECIFY')}),
      datasets: new FormArray([]),
      documentation: new FormGroup({}),
      legal: new FormGroup({}),
      storage: new FormArray([]),
      externalStorage: new FormArray([]),
      externalStorageInfo: new FormControl(),
      repositories: new FormArray([]),
      reuse: new FormGroup({}),
      costs: new FormGroup({})
    });
  }

  resetForm() {
  }

  exportFormToDmp() {
    return {};
  }
}

@NgModule({
  providers: [
    {provide: FormService, useClass: FormServiceStub},
  ]
})
export class FormTestingModule {
}
