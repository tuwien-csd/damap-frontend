import { Pipe, PipeTransform } from '@angular/core';
import {ProjectMember} from '../domain/project-member';
import {Contributor} from '../domain/contributor';

@Pipe({
  name: 'contributorFilter'
})
export class ContributorFilterPipe implements PipeTransform {

  transform(projectMembers: ProjectMember[], contributors: Contributor[]): unknown {
    return projectMembers.filter(e => contributors.find(entry => entry.person.universityId === e.person.universityId) === undefined);
  }

}
