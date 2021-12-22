import {Dmp} from '../../domain/dmp';

export interface FormState {
  dmp: Dmp;
  changed: boolean;
}

export const initialFormState: FormState = {
  dmp: {
    closedAccessInfo: '',
    committeeReviewed: false,
    contributors: [],
    costs: [],
    costsExist: null,
    dataGeneration: '',
    dataKind: null,
    datasets: [],
    ethicalIssuesExist: false,
    externalStorage: [],
    externalStorageInfo: '',
    hosts: [],
    humanParticipants: false,
    legalRestrictions: false,
    legalRestrictionsDocuments: [],
    otherLegalRestrictionsDocument: '',
    legalRestrictionsComment: '',
    dataRightsAndAccessControl: '',
    metadata: '',
    noDataExplanation: '',
    otherPersonalDataCompliance: '',
    personalData: false,
    personalDataCompliance: [],
    restrictedAccessInfo: '',
    restrictedDataAccess: '',
    sensitiveData: false,
    sensitiveDataSecurity: [],
    otherDataSecurityMeasures: '',
    sensitiveDataAccess: '',
    storage: [],
    structure: '',
    targetAudience: '',
    tools: '',
    id: null,
    project: null,
    contact: null
  },
  changed: false
};
