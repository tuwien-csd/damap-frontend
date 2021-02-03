import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Dmp} from '../domain/dmp';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjectMember} from '../domain/project-member';
import {Project} from '../domain/project';
import {PersonId} from '../domain/person-id';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = environment.backendUrl;
  private repositoryBackendUrl = this.backendUrl + 'repositories'
  private pdbBackendUrl = this.backendUrl + 'api/pdb'

  constructor(
    private http: HttpClient) {
  }

  getDmps(): Observable<Dmp[]> {
    return of([]);
  }

  getDmpById(id: number): Observable<Dmp> {
    // TODO
    return null;
  }

  createDmp(editedBy: PersonId, dmp: Dmp): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(editedBy);
    return this.http.post<string>(`${this.backendUrl}api/save-dmp/`, {edited_by: editedBy, dmp}, httpOptions).pipe(
      // TODO: Error handling
    );
  }

  editDmp(editedBy: PersonId, dmp: Dmp): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(`${this.backendUrl}api/save-dmp/`, {edited_by: editedBy, dmp}, httpOptions).pipe(
      // TODO: Error handling
    );
  }

  deleteDmp(id: number): void {

  }

  getSuggestedProjects(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.pdbBackendUrl}/suggest-projects/${userId}`).pipe(
      // TODO: Error handling
    );
  }

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.pdbBackendUrl}/project-staff/${projectId}`).pipe(
      // TODO: Error Handling here
    );

  }

  searchPerson(term: string) {

  }

  getRepositories(): Observable<any> {
    return this.http.get(this.repositoryBackendUrl).pipe(
      // TODO: Error Handling here
    );
  }

  getRepositoryById(id: string): Observable<any> {
    return this.http.get(`${this.repositoryBackendUrl}/${id}`).pipe(
      // TODO: Error Handling here
    );
  }
}
