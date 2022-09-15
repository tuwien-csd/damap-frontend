import {ContributorRole} from './enum/contributor-role.enum';
import {Identifier} from './identifier';

export interface Contributor {
  readonly id: number;
  readonly universityId: string;
  readonly personId: Identifier;
  readonly firstName: string;
  readonly lastName: string;
  readonly mbox: string;
  readonly affiliation: string;
  readonly affiliationId: Identifier;
  contact: boolean;
  role: ContributorRole;
  roleInProject: string;
}
