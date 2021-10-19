import {TestBed} from '@angular/core/testing';

import {FormService} from './form.service';
import {FormBuilder} from '@angular/forms';
import {completeDmp, noDataDmp} from '../mocks/dmp-mocks';
import {DataKind} from '../domain/enum/data-kind.enum';

describe('FormService', () => {
  let service: FormService;
  let formbuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({providers: [FormBuilder]});
    service = TestBed.inject(FormService);
    formbuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(formbuilder).toBeTruthy();
  });

  it('should export the same dmp as mapped to the form', () => {
    const form = service.createDmpForm();
    service.mapDmpToForm(completeDmp, form);
    expect(service.exportFormToDmp(form)).toEqual(completeDmp);
  })

  it('should not export dataset related fields when no datasets are defined', () => {
    const form = service.createDmpForm();
    service.mapDmpToForm(noDataDmp, form);
    const result = service.exportFormToDmp(form);
    expect(result.dataKind).toEqual(DataKind.NONE);
    expect(result.datasets).toEqual([]);
    expect(result.noDataExplanation).toEqual('');
    expect(result.storage).toEqual([]);
    expect(result.externalStorage).toEqual([]);
    expect(result.hosts).toEqual([]);
    expect(result.restrictedAccessInfo).toEqual('');
    expect(result.closedAccessInfo).toEqual('');
    expect(result.sensitiveData).toEqual(false);
    expect(result.sensitiveDataSecurity).toEqual('');
    expect(result.personalData).toEqual(false);
    expect(result.personalDataAccess).toEqual('');
    expect(result.personalDataCompliance).toEqual([]);
    expect(result.otherPersonalDataCompliance).toEqual('');
    expect(result.legalRestrictions).toEqual(false);
    expect(result.legalRestrictionsComment).toEqual('');
  })
});
