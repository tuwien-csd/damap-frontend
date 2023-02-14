import { Pipe, PipeTransform } from '@angular/core';

import { compareContributors, Contributor } from '../../../domain/contributor';

@Pipe({
  name: 'contributorFilter',
})
export class ContributorFilterPipe implements PipeTransform {
  transform(
    projectMembers: Contributor[],
    contributors: Contributor[]
  ): Contributor[] {
    return projectMembers?.filter(
      entry =>
        // filter contributors that are already in the list
        contributors.find(c => {
          return compareContributors(c, entry);
        }) === undefined
    );
  }
}
