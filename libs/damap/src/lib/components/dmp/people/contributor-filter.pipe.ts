import { Pipe, PipeTransform } from '@angular/core';

import { Contributor } from '../../../domain/contributor';

@Pipe({
  name: 'contributorFilter'
})
export class ContributorFilterPipe implements PipeTransform {

  transform(projectMembers: Contributor[], contributors: Contributor[]): Contributor[] {
    return projectMembers?.filter(
      entry =>
        // filter contributors that are already in the list based on universityId and personId
        contributors.find(c => {
          const universityId = c.universityId && entry.universityId && c.universityId === entry.universityId;
          const personId = c.personId && entry.personId &&
            c.personId.type === entry.personId.type &&
            c.personId.identifier === entry.personId.identifier;
          return (universityId || personId);
        }) === undefined
    );
  }

}
