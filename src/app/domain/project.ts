import {Person} from './person';

export interface Project {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  leader: Person;
}
