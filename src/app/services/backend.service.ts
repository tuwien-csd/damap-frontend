import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Dmp} from '../domain/dmp';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjectMember} from '../domain/project-member';
import {Project} from '../domain/project';
import {DmpListItem} from '../domain/dmp-list-item';
import {Repository} from '../domain/repository';
import {map} from 'rxjs/operators';

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

  // TODO: remove
  me() {
    return this.http.get<string>(`${this.backendUrl}users/me`);
  }

  getDmps(userId: string): Observable<DmpListItem[]> {
    return this.http.get<DmpListItem[]>(`${this.backendUrl}plans/dmp-list/${userId}`).pipe();
    // TODO: Error handling
  }

  getDmpById(id: number): Observable<Dmp> {
    // TODO
    return this.http.get<Dmp>(`${this.backendUrl}plans/dmp/${id}`).pipe();
  }

  createDmp(editedBy: string, dmp: Dmp): Observable<{ id: number }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<{ id: number }>(`${this.backendUrl}plans/save-dmp/`, {edited_by: editedBy, dmp}, httpOptions).pipe(
      // TODO: Error handling
    );
  }

  editDmp(editedBy: string, dmp: Dmp): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.backendUrl}plans/save-dmp/`, {edited_by: editedBy, dmp}, httpOptions).pipe(
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
    return this.http.get<Repository[]>(this.repositoryBackendUrl).pipe(
      // TODO: Error Handling here
    );
  }

  getRepositoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.repositoryBackendUrl}/${id}`).pipe(
      map(details => ({id, changes: {info: details.repository[0]}}))
      // TODO: Error Handling here
    );
  }

  /*
  analyseFileData(file: FormData): Observable<any> {
    return this.http.post(`${this.backendUrl}api/fits/examine`, file, {reportProgress: true, observe: 'events'})
      .pipe();
  }*/

  getDmpDocument(id: number) {
    return this.http.get(this.backendUrl + 'document/' + id,
      {responseType: 'blob', observe: 'response'}).subscribe(
      response => {
        const a = document.createElement('a');
        const url = URL || webkitURL;
        const contentDisposition = response.headers.get('content-disposition');
        a.href = url.createObjectURL(response.body);
        a.download = this.getFilenameFromContentDisposition(contentDisposition);
        // start download
        a.click();
        url.revokeObjectURL(a.href);
      }
    );
  }

  private getFilenameFromContentDisposition(contentDisposition: string): string {
    const start = contentDisposition.lastIndexOf('filename=');
    return contentDisposition.substring(start+9);
  }
}
