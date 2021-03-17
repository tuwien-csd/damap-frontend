import {Person} from './person';
import {ContributorRole} from './enum/contributor-role.enum';

export interface Contributor {
  readonly person: Person;
  roles: ContributorRole[];
}
