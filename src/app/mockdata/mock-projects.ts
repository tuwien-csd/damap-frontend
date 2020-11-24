import {Project} from '../domain/project';
import {PEOPLE} from './mock-people';

export const PROJECTS: Project[] = [
  { id: 1, title: 'Mock Project 1', description: 'This is a mock project', end: new Date(), start: new Date(), leader: PEOPLE[0] },
  { id: 2, title: 'Mock Project 2', description: 'This is a mock project', end: new Date(), start: new Date(), leader: PEOPLE[1] },
  { id: 3, title: 'Mock Project 3', description: 'This is a mock project', end: new Date(), start: new Date(), leader: null },
];
