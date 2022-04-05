import {Injectable, NgModule} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {FormService} from '../../services/form.service';

@Injectable()
export class FormServiceStub {

  dmpForm = new FormGroup({
    project: new FormControl(),
    data: new FormGroup({kind: new FormControl('SPECIFY')}),
    datasets: new FormArray([]),
    hosts: new FormArray([])
  });

  resetForm() {
  }
}

@NgModule({
  providers: [
    {provide: FormService, useValue: FormServiceStub},
  ]
})
export class FormTestingModule {
}
