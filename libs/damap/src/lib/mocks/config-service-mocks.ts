import { Config } from '../domain/config';
import { ServiceConfig } from '../domain/config-services';

// Mock data for service config
export const serviceConfigMockData: ServiceConfig[] = [
  { displayText: 'UNIVERSITY', queryValue: 'UNIVERSITY' },
  { displayText: 'ORCID', queryValue: 'ORCID' },
];

// Mock data for config
export const configMockData: Config = {
  authUrl: '',
  authClient: '',
  authScope: '',
  authUser: '',
  env: '',
  personSearchServiceConfigs: serviceConfigMockData,
  fitsServiceAvailable: true,
};
