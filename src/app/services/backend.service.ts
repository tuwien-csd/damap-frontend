import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Dmp} from '../domain/dmp';
import {DMPS} from '../mockdata/mock-dmps';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjectMember} from '../domain/project-member';
import {Project} from '../domain/project';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = environment.backendUrl;
  private repositoryBackendUrl = this.backendUrl  + '/repositories'
  private pdbBackendUrl = this.backendUrl + '/api/pdb'

  constructor(
    private http: HttpClient) {
  }

  getDmps(): Observable<Dmp[]> {
    return of(DMPS);
  }

  getDmpById(id: number): Observable<Dmp> {
    return of(DMPS[0]);
  }

  createDmp(dmp: Dmp): void {

  }

  editDmp(dmp: Dmp): void {

  }

  deleteDmp(id: number): void {

  }

  getProjectById(projectId: number) {

  }

  getSuggestedProjects(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.pdbBackendUrl}/suggest-projects/${userId}`).pipe(
      // TODO: Error handling
    );
  }

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.pdbBackendUrl}/project/${projectId}/staff`).pipe(
      //   TODO: Error Handling here
    );

  }

  searchPerson(term: string) {

  }

  getRepositories(): Observable<any>  {
    return this.http.get(this.repositoryBackendUrl).pipe(
    //   TODO: Error Handling here
    );
  }

  getRepositoryById(id: string): Observable<any> {
    return this.http.get(`${this.repositoryBackendUrl}/${id}`).pipe(
      // TODO: Error Handling here
    );
  }
}
