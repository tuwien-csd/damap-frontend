import { Project } from '../domain/project';
import { Pagination } from '../domain/search/pagination';
import { Search } from '../domain/search/search';
import { SearchResult } from '../domain/search/search-result';
import { mockProject, mockRecommendedProject } from './project-mocks';

export const mockPagination: Pagination = {
  page: 1,
  perPage: 10,
  hasNext: false,
  hasPrevious: false,
};

export const mockSearch: Search = {
  pagination: mockPagination,
  query: '',
};

export const mockProjectSearchResult: SearchResult<Project> = {
  items: [mockProject],
  search: mockSearch,
};

export const mockRecommendedProjectSearchResult: SearchResult<Project> = {
  items: [mockRecommendedProject],
  search: mockSearch,
};
