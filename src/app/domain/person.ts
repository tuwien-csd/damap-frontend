import {PersonId} from './person-id';

export interface Person {
  readonly id: number;
  readonly universityId: string;
  readonly personId: PersonId;
  readonly firstName: string;
  readonly lastName: string;
  readonly mbox: string;
}
