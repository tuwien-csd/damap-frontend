import {Project} from './project';
import {Person} from './person';
import {FunctionRole} from './enum/function-role.enum';

export interface DmpListItem {
  readonly id: number;
  readonly title: string;
  readonly contact: Person;
  readonly created: Date;
  readonly modified: Date;
  readonly description: string;
  readonly project: Project;
  readonly accessType: FunctionRole;
}
