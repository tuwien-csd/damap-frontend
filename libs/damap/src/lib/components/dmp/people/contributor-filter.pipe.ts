import {Pipe, PipeTransform} from '@angular/core';
import {Contributor} from '../../../domain/contributor';

@Pipe({
  name: 'contributorFilter'
})
export class ContributorFilterPipe implements PipeTransform {

  transform(projectMembers: Contributor[], contributors: Contributor[]): Contributor[] {
    return projectMembers?.filter(e => contributors.find(entry => entry.universityId === e.universityId) === undefined);
  }

}
