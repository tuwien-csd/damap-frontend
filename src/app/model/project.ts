import {Contributor} from "./contributor";

export interface Project {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  leader: Contributor;
}
