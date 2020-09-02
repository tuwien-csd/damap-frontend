import {Contributor} from "../model/contributor";
import {ContributorType} from "../model/enum/contributor-type.enum";

export const PEOPLE: Contributor[] = [
  {
    id: 123,
    contributorId: 297350,
    contributorType: ContributorType.tissid,
    mbox: 'tomasz.miksa@tuwien.ac.at',
    name: 'Tomasz Miksa',
    role: undefined
  },
  {
    id: 456,
    contributorId: 181524,
    contributorType: ContributorType.tissid,
    mbox: 'zeno.casellato@tuwien.ac.at',
    name: 'Zeno Casellato',
    role: undefined
  },
  {
    id: 789,
    contributorId: 292790,
    contributorType: ContributorType.tissid,
    mbox: 'clara.schuster@tuwien.ac.at',
    name: 'Clara Schuster',
    role: undefined
  }
];
