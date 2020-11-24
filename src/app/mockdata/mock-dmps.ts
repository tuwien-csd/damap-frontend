import {Dmp} from '../domain/dmp';
import {PROJECTS} from './mock-projects';

export const DMPS: Dmp[] = [
  new Dmp(123,'Mock DMP 1', PROJECTS[0]),
  new Dmp(456, 'Mock DMP 2', PROJECTS[1]),
];
