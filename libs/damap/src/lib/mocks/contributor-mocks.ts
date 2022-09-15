import {IdentifierType} from '../domain/enum/identifier-type.enum';
import {Contributor} from '../domain/contributor';
import {ContributorRole} from '../domain/enum/contributor-role.enum';

export const mockContact: Contributor = {
  id: 77,
  universityId: '12345',
  personId: null,
  firstName: 'Max',
  lastName: 'Mustermann',
  mbox: 'm.mustermann@university.ac.at',
  affiliation: 'TU Wien',
  affiliationId: {identifier: 'XXX', type: IdentifierType.ROR},
  contact: true,
  role: null,
  roleInProject: 'Project leader'
};

export const mockContributor1: Contributor = {
  id: 80,
  universityId: '34567',
  personId: null,
  firstName: 'Moritz',
  lastName: 'Mustermann',
  mbox: 'mo.mustermann@university.ac.at',
  affiliation: 'TU Wien',
  affiliationId: {identifier: 'XXX', type: IdentifierType.ROR},
  contact: false,
  role: ContributorRole.EDITOR,
  roleInProject: 'Project manager'
};

export const mockContributor2: Contributor = {
  id: 98,
  universityId: '23456',
  firstName: 'Anna',
  lastName: 'Musterfrau',
  mbox: 'm.musterfrau@university.ac.at',
  personId: {
    identifier: '0000-0000-0000-xxxx',
    type: IdentifierType.ORCID
  },
  affiliation: 'TU Wien',
  affiliationId: {identifier: 'XXX', type: IdentifierType.ROR},
  contact: false,
  role: ContributorRole.PROJECT_MANAGER,
  roleInProject: 'Project manager'
};
