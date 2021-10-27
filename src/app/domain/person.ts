import {Identifier} from './identifier';

export interface Person {
  readonly id: number;
  readonly universityId: string;
  readonly personId: Identifier;
  readonly firstName: string;
  readonly lastName: string;
  readonly mbox: string;
  readonly affiliation: string;
  readonly affiliationId: Identifier;
}
