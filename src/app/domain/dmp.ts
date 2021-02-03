import {Project} from './project';
import {Contributor} from './contributor';
import {Person} from './person';
import {DataKind} from './enum/data-kind.enum';
import {Dataset} from './dataset';
import {Host} from './host';

export interface Dmp {
  readonly created?: Date;
  readonly modified?: Date;
  id?: number;
  title?: string;
  description?: string;
  project: Project;
  contact: Person;
  contributors: Contributor[];
  datakind: DataKind;
  noDataExplanation: string;
  datasets: Dataset[];
  metadata: string;
  dataGeneration: string;
  structure: string;
  targetAudience: string;
  personalInformation: boolean;
  sensitiveData: boolean;
  legalRestrictions: boolean;
  ethicalIssuesExist: boolean;
  committeeApproved: boolean;
  ethicsReport: string;
  optionalStatement: string;
  hosts: Host[];
}
