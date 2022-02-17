import {TestBed} from '@angular/core/testing';

import {FormService} from './form.service';
import {FormBuilder} from '@angular/forms';
import {completeDmp, noDataDmp} from '../mocks/dmp-mocks';
import {DataKind} from '../domain/enum/data-kind.enum';

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
  })

  it('should not export dataset related fields when no datasets are defined unless values are set by the cris system', () => {
    service.mapDmpToForm(noDataDmp);
    const result = service.exportFormToDmp();
    expect(result.dataKind).toEqual(DataKind.NONE);
    expect(result.datasets).toEqual([]);
    expect(result.noDataExplanation).toEqual('');
    expect(result.storage).toEqual([]);
    expect(result.externalStorage).toEqual([]);
    expect(result.hosts).toEqual([]);
    expect(result.restrictedAccessInfo).toEqual('');
    expect(result.closedAccessInfo).toEqual('');
    expect(result.sensitiveData).toEqual(true);
    expect(result.sensitiveDataCris).toEqual(false);
    expect(result.sensitiveDataSecurity).toEqual([]);
    expect(result.sensitiveDataAccess).toEqual('');
    expect(result.personalData).toEqual(true);
    expect(result.personalDataCris).toEqual(true);
    expect(result.personalDataCompliance).toEqual([]);
    expect(result.otherPersonalDataCompliance).toEqual('');
    expect(result.legalRestrictions).toEqual(true);
    expect(result.legalRestrictionsCris).toEqual(true);
    expect(result.legalRestrictionsComment).toEqual('');
    expect(result.legalRestrictionsDocuments).toEqual([]);
    expect(result.otherLegalRestrictionsDocument).toEqual('');
    expect(result.humanParticipants).toEqual(true);
    expect(result.humanParticipantsCris).toEqual(true);
    expect(result.costsExist).toEqual(true);
    expect(result.costsExistCris).toEqual(false);
    expect(result.committeeReviewed).toEqual(true);
    expect(result.committeeReviewedCris).toEqual(true);
    expect(result.ethicalIssuesExist).toEqual(false);
    expect(result.ethicalIssuesExistCris).toEqual(false);
  })
});
