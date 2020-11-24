import {PersonIdType} from './enum/person-id-type.enum';

export interface PersonId {

  readonly identifier: string;
  readonly type: PersonIdType;

}

