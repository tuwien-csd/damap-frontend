import {IdentifierType} from '../domain/enum/identifier-type.enum';

export const mockContact = {
  firstName: 'Max', id: 77, lastName: 'Mustermann', mbox: 'm.mustermann@university.ac.at', universityId: '12345', personId: null,
  affiliation: 'TU Wien', affiliationId: {identifier: 'XXX', type: IdentifierType.ROR}
};
