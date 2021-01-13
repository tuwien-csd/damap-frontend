import {Person} from './person';
import {Funding} from './funding';

export interface Project {
  id: number;
  title: string;
  description: string;
  funding: Funding;
  start: Date;
  end: Date;
  leader: Person;
}
