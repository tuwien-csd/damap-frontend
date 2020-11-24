import {Person} from './person';

export interface ProjectMember {
  readonly person: Person;
  readonly roleInProject: string;
}
