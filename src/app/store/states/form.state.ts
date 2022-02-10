import {Dmp} from '../../domain/dmp';

export interface FormState {
  dmp: Dmp;
  changed: boolean;
}

export const initialFormState: FormState = {
  dmp: {
    closedAccessInfo: '',
    committeeReviewed: false,
    committeeReviewedCris: false,
    contributors: [],
    costs: [],
    costsExist: null,
    costsExistCris: false,
    dataGeneration: '',
    dataKind: null,
    datasets: [],
    ethicalIssuesExist: false,
    ethicalIssuesExistCris: false,
    externalStorage: [],
    externalStorageInfo: '',
    hosts: [],
    humanParticipants: false,
    humanParticipantsCris: false,
    legalRestrictions: false,
    legalRestrictionsCris: false,
    legalRestrictionsDocuments: [],
    otherLegalRestrictionsDocument: '',
    legalRestrictionsComment: '',
    dataRightsAndAccessControl: '',
    metadata: '',
    noDataExplanation: '',
    otherPersonalDataCompliance: '',
    personalData: false,
    personalDataCris: false,
    personalDataCompliance: [],
    restrictedAccessInfo: '',
    restrictedDataAccess: '',
    sensitiveData: false,
    sensitiveDataCris: false,
    sensitiveDataSecurity: [],
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
