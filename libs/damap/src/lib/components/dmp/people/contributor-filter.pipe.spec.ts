import {
  mockContributor1,
  mockContributor2,
} from '../../../mocks/contributor-mocks';
import { ContributorFilterPipe } from './contributor-filter.pipe';

describe('ContributorFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ContributorFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter Contributors', () => {
    const pipe = new ContributorFilterPipe();
    const addedContributors = [mockContributor1];
    const contributorSearchResult = [mockContributor1, mockContributor2];

    var filteredContributors = pipe.transform(contributorSearchResult, addedContributors);
    expect(filteredContributors);
    expect(filteredContributors.length).toBe(1);
    expect(filteredContributors[0]).toBe(mockContributor2);
  });
});
