import { Access } from "../domain/access";
import { FunctionRole, IdentifierType } from "@damap/core";

export const mockAccess: Access = {
  id: 100,
  dmpId: 100,
  universityId: '12345',
  personId: null,
  firstName: 'Max',
  lastName: 'Mustermann',
  mbox: 'm.mustermann@university.ac.at',
  affiliation: 'TU Wien',
  affiliationId: {identifier: 'XXX', type: IdentifierType.ROR},
  contact: true,
  role: null,
  roleInProject: undefined,
  access: FunctionRole.EDITOR
};
