import { ContributorRole } from './enum/contributor-role.enum';
import { Identifier } from './identifier';

interface Contributor {
  id: number;
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

function compareContributors(c1: Contributor, c2: Contributor) {
  const universityId =
    c1.universityId && c2.universityId && c1.universityId === c2.universityId;
  const personId =
    c1.personId &&
    c2.personId &&
    c1.personId.type === c2.personId.type &&
    c1.personId.identifier === c2.personId.identifier;
  return universityId || personId;
}

export { compareContributors, Contributor };
