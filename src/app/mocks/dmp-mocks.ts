import {Dmp} from '../domain/dmp';
import {CostType} from '../domain/enum/cost-type.enum';
import {DataKind} from '../domain/enum/data-kind.enum';
import {ComplianceType} from '../domain/enum/compliance-type.enum';
import {SecurityMeasure} from '../domain/enum/security-measure.enum';
import {Agreement} from '../domain/enum/agreement.enum';
import {mockProject} from './project-mocks';
import {mockContact, mockContributor1, mockContributor2} from './contributor-mocks';
import {closedDatasetMock, openDatasetMock, restrictedDatasetMock} from './dataset-mocks';
import {DataQualityType} from '../domain/enum/data-quality-type.enum';
import {mockStorage} from './storage-mocks';

export const completeDmp: Dmp = {
  reusedDataKind: DataKind.SPECIFY,
  dataRightsAndAccessControl: 'access control',
  humanParticipants: true,
  humanParticipantsCris: true,
  otherDataSecurityMeasures: 'other measure',
  sensitiveDataAccess: 'sensitive data access',
  closedAccessInfo: 'closed access info',
  committeeReviewed: true,
  committeeReviewedCris: true,
  contributors: [
    mockContact,
    mockContributor1,
    mockContributor2
  ],
  costs: [
    {
      currencyCode: 'EUR',
      customType: '',
      description: 'cost description',
      id: 103,
      title: 'New cost',
      type: CostType.DATABASE,
      value: 123
    }
  ],
  costsExist: true,
  costsExistCris: false,
  dataGeneration: 'research data will be generated by conducting a survey',
  dataKind: DataKind.SPECIFY,
  dataQuality: [DataQualityType.CALIBRATION, DataQualityType.PEER_REVIEW_OF_DATA],
  datasets: [closedDatasetMock, restrictedDatasetMock],
  ethicalIssuesExist: true,
  ethicalIssuesExistCris: true,
  externalStorage: [
    // TODO
    /*{
      hostId: 'TU Files',
      backupFrequency: 'Wien',
      backupLocation: null,
      datasets: [
        '39608ko19edx5'
      ],
      id: null,
      storageLocation: null,
      title: 'OtherStorage',
      url: 'github.com'
    }*/
  ],
  externalStorageInfo: 'because',
  repositories: [
    {
      datasets: [
        closedDatasetMock.referenceHash, restrictedDatasetMock.referenceHash
      ],
      repositoryId: 'r3d100013557',
      id: 94,
      title: 'TU Data'
    },
  ],
  id: 76,
  legalRestrictions: true,
  legalRestrictionsCris: true,
  legalRestrictionsComment: 'legally restricted',
  legalRestrictionsDocuments: [Agreement.OTHER],
  otherLegalRestrictionsDocument: 'other document',
  metadata: 'provided metadata',
  noDataExplanation: '',
  personalData: true,
  personalDataCris: true,
  personalDataCompliance: ['item1', 'item2', ComplianceType.OTHER],
  otherDataQuality: 'other data quality measures',
  otherPersonalDataCompliance: 'other measures',
  project: mockProject,
  restrictedAccessInfo: 'info how someone can access restricted data',
  restrictedDataAccess: 'send form',
  sensitiveData: true,
  sensitiveDataCris: true,
  sensitiveDataSecurity: [SecurityMeasure.OTHER],
  storage: [
    mockStorage
  ],
  structure: 'VCS',
  targetAudience: 'students',
  tools: 'proprietary software needed'
};

export const noDataDmp: Dmp = {
  reusedDataKind: DataKind.NONE,
  dataRightsAndAccessControl: 'access control',
  humanParticipants: true,
  humanParticipantsCris: true,
  legalRestrictionsDocuments: [Agreement.CONFIDENTIALITY_AGREEMENT],
  otherDataSecurityMeasures: '',
  otherLegalRestrictionsDocument: '',
  sensitiveDataAccess: 'access',
  closedAccessInfo: 'closed access info',
  committeeReviewed: true,
  committeeReviewedCris: true,
  contributors: [
    mockContact,
    mockContributor1,
    mockContributor2
  ],
  costs: [
    {
      currencyCode: 'EUR',
      customType: '',
      description: 'cost description',
      id: 103,
      title: 'New cost',
      type: CostType.DATABASE,
      value: 123
    }
  ],
  costsExist: true,
  costsExistCris: false,
  dataGeneration: 'research data will be generated by conducting a survey',
  dataKind: DataKind.NONE,
  dataQuality: [DataQualityType.REPRESENTATION_WITH_CONTROLLED_VOCABULARIES, DataQualityType.DATA_ENTRY_VALIDATION],
  datasets: [closedDatasetMock, restrictedDatasetMock],
  ethicalIssuesExist: false,
  ethicalIssuesExistCris: false,
  externalStorage: [
    {
      backupFrequency: 'Wien',
      backupLocation: null,
      datasets: [
        '39608ko19edx5'
      ],
      id: null,
      storageLocation: null,
      title: 'OtherStorage',
      url: 'github.com'
    }
  ],
  externalStorageInfo: 'because',
  repositories: [
    {
      datasets: [
        openDatasetMock.referenceHash
      ],
      repositoryId: 'r3d100013557',
      id: 94,
      title: 'TU Data'
    },
  ],
  id: 76,
  legalRestrictions: true,
  legalRestrictionsCris: true,
  legalRestrictionsComment: 'legally restricted',
  metadata: 'provided metadata',
  noDataExplanation: '',
  personalData: true,
  personalDataCris: true,
  personalDataCompliance: ['item1', 'item2'],
  otherDataQuality: 'other data quality measures',
  otherPersonalDataCompliance: 'other measures',
  project: mockProject,
  restrictedAccessInfo: 'info how someone can access restricted data',
  restrictedDataAccess: 'send form',
  sensitiveData: true,
  sensitiveDataCris: false,
  sensitiveDataSecurity: [SecurityMeasure.OTHER],
  storage: [
    mockStorage
  ],
  structure: 'VCS',
  targetAudience: 'students',
  tools: 'proprietary software needed'
};
