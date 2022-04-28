import {DataAccessType} from './enum/data-access-type.enum';
import {AccessRight} from './enum/access-right.enum';
import {DataType} from './enum/data-type.enum';

export interface Dataset {
  readonly id: number;
  title: string;
  type: DataType[];
  size: number;
  comment: string;
  personalData: boolean;
  sensitiveData: boolean;
  legalRestrictions: boolean;
  license: string;
  startDate: Date;
  dataAccess: DataAccessType;
  referenceHash: string; // user ID + timestamp hash
  selectedProjectMembersAccess: AccessRight;
  otherProjectMembersAccess: AccessRight;
  publicAccess: AccessRight;
  delete: boolean;
  dateOfDeletion: Date;
  reasonForDeletion: string;
  retentionPeriod: number;
}
