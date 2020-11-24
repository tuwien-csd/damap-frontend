import {PersonId} from './person-id';

export interface Person {
  readonly id: string; // damap internal ID
  readonly personId: PersonId;
  readonly mbox: string;
  readonly firstName: string;
  readonly lastName: string;
}
