import {Host} from './host';

export interface Storage extends Host {
  url?: string;
  backupFrequency?: string;
  storageLocation?: string;
  backupLocation?: string;
}
