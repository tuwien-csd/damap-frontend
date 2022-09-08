import {InternalStorage} from '../domain/internal-storage';
import {Storage} from '../domain/storage';
import {closedDatasetMock, restrictedDatasetMock} from './dataset-mocks';

export const mockInternalStorage: InternalStorage = {
  id: -1,
  backupFrequency: 'weekly',
  backupLocation: 'AUT',
  description: 'Internal storage mock description',
  languageCode: 'eng',
  storageLocation: 'AUT',
  title: 'Internal storage mock',
  url: 'www'
}

export const mockStorage: Storage = {
  datasets: [closedDatasetMock.referenceHash, restrictedDatasetMock.referenceHash],
  id: -2,
  internalStorageId: -1,
  title: 'Internal storage mock'
}
