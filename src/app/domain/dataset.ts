import {DataAccessType} from './enum/data-access-type.enum';
import {AccessRight} from './enum/access-right';

export interface Dataset {
  readonly id: number;
  title: string;
  type: any;
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
}
