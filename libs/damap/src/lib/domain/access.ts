import { FunctionRole } from "./enum/function-role.enum";
import { Contributor } from "./contributor";

export interface Access extends Contributor {
  dmpId: number;
  access: FunctionRole;
  start?: Date;
  until?: Date;

}
