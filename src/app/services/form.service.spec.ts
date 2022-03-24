import {TestBed} from '@angular/core/testing';

import {FormService} from './form.service';
import {FormBuilder} from '@angular/forms';
import {completeDmp, noDataDmp} from '../mocks/dmp-mocks';

describe('FormService', () => {
  let service: FormService;
  let formbuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [FormBuilder]});
    service = TestBed.inject(FormService);
    formbuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(formbuilder).toBeTruthy();
  });

  it('should export the same dmp as mapped to the form', () => {
    service.mapDmpToForm(completeDmp);
    expect(service.exportFormToDmp()).toEqual(completeDmp);
    service.mapDmpToForm(noDataDmp);
    expect(service.exportFormToDmp()).toEqual(noDataDmp);
  })
});
