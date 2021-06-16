import {Person} from './person';
import {ContributorRole} from './enum/contributor-role.enum';

export interface Contributor {
  readonly id: number;
  readonly person: Person;
  role: ContributorRole;
}
