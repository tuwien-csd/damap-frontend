import {ContributorType} from "./enum/contributor-type.enum";
import {ContributorRole} from "./enum/contributor-role.enum";

export interface Contributor {
  id: number;
  contributorId: number;
  contributorType: ContributorType;
  mbox: string;
  name: string;
  role: ContributorRole;
}
