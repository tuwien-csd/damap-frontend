import {DataAccessType} from './enum/data-access-type.enum';

export interface Dataset {
  title: string;
  type: any;
  size: number;
  comment: string;
  publish: boolean;
  license: string;
  startDate: Date;
  dataAccess: DataAccessType;
  referenceHash: string; // user ID + timestamp hash
}
