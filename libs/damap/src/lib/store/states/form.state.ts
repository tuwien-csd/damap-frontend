import {Dmp} from '../../domain/dmp';

export interface FormState {
  dmp: Dmp;
  changed: boolean;
}

export const initialFormState: FormState = {
  dmp: {
    closedAccessInfo: '',
    committeeReviewed: false,
    committeeReviewedCris: undefined,
    contributors: [],
    costs: [],
    costsExist: null,
    costsExistCris: undefined,
    dataGeneration: '',
    dataKind: null,
    dataQuality: [],
    datasets: [],
    ethicalIssuesExist: false,
    ethicalIssuesExistCris: undefined,
    externalStorage: [],
    externalStorageInfo: '',
    repositories: [],
    humanParticipants: false,
    humanParticipantsCris: undefined,
    legalRestrictions: false,
    legalRestrictionsCris: undefined,
    legalRestrictionsDocuments: [],
    otherLegalRestrictionsDocument: '',
    legalRestrictionsComment: '',
    dataRightsAndAccessControl: '',
    metadata: '',
    noDataExplanation: '',
    otherPersonalDataCompliance: '',
    personalData: false,
    personalDataCris: undefined,
    personalDataCompliance: [],
    restrictedAccessInfo: '',
    restrictedDataAccess: '',
    reusedDataKind: null,
    sensitiveData: false,
    sensitiveDataCris: undefined,
    sensitiveDataSecurity: [],
    otherDataQuality: '',
    otherDataSecurityMeasures: '',
    sensitiveDataAccess: '',
    storage: [],
    structure: '',
    targetAudience: '',
    tools: '',
    id: null,
    project: null
  },
  changed: false
};
