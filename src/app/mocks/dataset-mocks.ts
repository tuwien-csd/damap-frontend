import {Dataset} from '../domain/dataset';
import {DataAccessType} from '../domain/enum/data-access-type.enum';
import {AccessRight} from '../domain/enum/access-right.enum';
import {DataType} from '../domain/enum/data-type.enum';

export const closedDatasetMock: Dataset = {
  comment: '',
  dataAccess: DataAccessType.CLOSED,
  id: 82,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '39608knzrof6y',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: [DataType.ARCHIVED_DATA],
  selectedProjectMembersAccess: AccessRight.WRITE,
  otherProjectMembersAccess: AccessRight.READ,
  publicAccess: AccessRight.NONE,
  delete: true,
  dateOfDeletion: new Date(20000),
  reasonForDeletion: 'reason1',
  retentionPeriod: 10
}

export const restrictedDatasetMock: Dataset = {
  comment: '',
  dataAccess: DataAccessType.RESTRICTED,
  id: 83,
  license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  personalData: true,
  sensitiveData: true,
  legalRestrictions: true,
  referenceHash: '39608knzrof6x',
  size: 0,
  startDate: null,
  title: 'Dataset 1',
  type: [DataType.ARCHIVED_DATA],
  selectedProjectMembersAccess: AccessRight.WRITE,
  otherProjectMembersAccess: AccessRight.READ,
  publicAccess: AccessRight.NONE,
  delete: false,
  dateOfDeletion: null,
  reasonForDeletion: '',
  retentionPeriod: null
}
