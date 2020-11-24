import {PersonIdType} from '../domain/enum/person-id-type.enum';
import {Person} from '../domain/person';

export const PEOPLE: Person[] = [
  {
    id: '297350',
    personId: {identifier: '123', type: PersonIdType.ORCID},
    mbox: 'tomasz.miksa@tuwien.ac.at',
    firstName: 'Tomasz',
    lastName: 'Miksa'
  },
  {
    id: '181524',
    personId: {identifier: '456', type: PersonIdType.ORCID},
    mbox: 'zeno.casellato@tuwien.ac.at',
    firstName: 'Zeno',
    lastName: 'Casellato'
  },
  {
    id: '292792',
    personId: {identifier: '789', type: PersonIdType.ORCID},
    mbox: 'clara.schuster@tuwien.ac.at',
    firstName: 'Clara',
    lastName: 'Schuster'
  }
];
