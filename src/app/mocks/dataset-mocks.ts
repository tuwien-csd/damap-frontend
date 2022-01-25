import {Dataset} from '../domain/dataset';
import {DataAccessType} from '../domain/enum/data-access-type.enum';
import {AccessRight} from '../domain/enum/access-right';

export const closedDatasetMock: Dataset = {
  comment: '',
  dataAccess: DataAccessType.closed,
  id: 82,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '39608knzrof6y',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: 'STANDARD_OFFICE_DOCUMENTS',
  selectedProjectMembersAccess: AccessRight.write,
  otherProjectMembersAccess: AccessRight.read,
  publicAccess: AccessRight.none,
  delete: true,
  dateOfDeletion: new Date(20000),
  reasonForDeletion: 'reason1',
  retentionPeriod: 10
}

export const restrictedDatasetMock: Dataset = {
  comment: '',
  dataAccess: DataAccessType.restricted,
  id: 83,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '39608knzrof6x',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: 'STANDARD_OFFICE_DOCUMENTS',
  selectedProjectMembersAccess: AccessRight.write,
  otherProjectMembersAccess: AccessRight.read,
  publicAccess: AccessRight.none,
  delete: false,
  dateOfDeletion: null,
  reasonForDeletion: '',
  retentionPeriod: null
}
