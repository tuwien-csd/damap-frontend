export interface InternalStorage {
  readonly id: number;
  readonly url: string;
  readonly backupFrequency: string;
  readonly storageLocation: string;
  readonly backupLocation: string;
  // the following information comes from the translation table
  readonly languageCode: string;
  readonly title: string;
  readonly description: string;
}
