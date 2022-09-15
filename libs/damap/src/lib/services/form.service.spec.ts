import {TestBed} from '@angular/core/testing';

import {FormService} from './form.service';
import {UntypedFormBuilder} from '@angular/forms';
import {completeDmp, noDataDmp} from '../mocks/dmp-mocks';

describe('FormService', () => {
  let service: FormService;
  let formbuilder: UntypedFormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [UntypedFormBuilder]});
    service = TestBed.inject(FormService);
    formbuilder = TestBed.inject(UntypedFormBuilder);
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
