import {IdentifierType} from './enum/identifier-type.enum';

export interface Identifier {

  readonly identifier: string;
  readonly type: IdentifierType;

}
