import {Identifier} from './identifier';

export interface Funding {
  readonly id: number;
  funderId: Identifier;
  fundingStatus;
  grantId: Identifier;
}
