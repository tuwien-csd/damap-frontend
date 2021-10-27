import {IdentifierType} from './enum/person-id-type.enum';

export interface Identifier {

  readonly identifier: string;
  readonly type: IdentifierType;

}
