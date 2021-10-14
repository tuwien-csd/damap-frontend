import {Injectable, isDevMode} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Dmp} from '../domain/dmp';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProjectMember} from '../domain/project-member';
import {Project} from '../domain/project';
import {DmpListItem} from '../domain/dmp-list-item';
import {Repository} from '../domain/repository';
import {catchError, map, retry, shareReplay} from 'rxjs/operators';
import {FeedbackService} from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = isDevMode() ? 'http://localhost:8080/api/' : `${window.location.origin}/api/`
  private dmpBackendUrl = this.backendUrl + 'dmps'
  private projectBackendUrl = this.backendUrl + 'projects';
  private repositoryBackendUrl = this.backendUrl + 'repositories';

  constructor(
    private http: HttpClient,
    private feedbackService: FeedbackService) {
  }

  private static getFilenameFromContentDisposition(contentDisposition: string): string {
    const start = contentDisposition.lastIndexOf('filename=');
    return contentDisposition.substring(start + 9);
  }

  getDmps(): Observable<DmpListItem[]> {
    return this.http.get<DmpListItem[]>(`${this.dmpBackendUrl}/list`).pipe(
      retry(3),
      catchError(this.handleError('Failed to load plans.'))
    );

  }

  getDmpById(id: number): Observable<Dmp> {
    return this.http.get<Dmp>(`${this.dmpBackendUrl}/${id}`).pipe(
      retry(3),
      catchError(this.handleError('Failed to load plan.'))
    );
  }

  createDmp(dmp: Dmp): Observable<Dmp> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Dmp>(this.dmpBackendUrl, dmp, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError('Failed to save plan.'))
      );
  }

  editDmp(dmp: Dmp): Observable<Dmp> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dmp>(`${this.dmpBackendUrl}/${dmp.id}`, dmp, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError('Failed to update plan.'))
      );
  }

  getSuggestedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectBackendUrl).pipe(
      retry(3),
      catchError(this.handleError('Failed to load projects.')),
      shareReplay(1)
    );
  }

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.projectBackendUrl}/${projectId}/staff`).pipe(
      retry(3),
      catchError(this.handleError('Failed to load project members.'))
    );

  }

  getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.repositoryBackendUrl).pipe(
      retry(3),
      catchError(this.handleError('Failed to load repositories.'))
    );
  }

  getRepositoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.repositoryBackendUrl}/${id}`).pipe(
      map(details => ({id, changes: {info: details.repository[0]}})),
      retry(3),
      catchError(this.handleError('Failed to load repository details.'))
    );
  }

  searchRepository(filters: any): Observable<Repository[]> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        filters[key]?.forEach(item => params = params.append(key, item));
      }
    }
    return this.http.get<Repository[]>(`${this.repositoryBackendUrl}/search`, {params}).pipe(
      catchError(this.handleError('Failed to search repositories.'))
    );
  }

  analyseFileData(file: FormData): Observable<any> {
    return this.http.post(`${this.backendUrl}fits/examine`, file,
      {reportProgress: true, observe: 'events'})
      .pipe(
        catchError(this.handleError('Failed to analyse file.'))
      );
  }

  getDmpDocument(id: number) {
    return this.http.get(this.backendUrl + 'document/' + id,
      {responseType: 'blob', observe: 'response'}).subscribe(
      response => {
        const a = document.createElement('a');
        const url = URL || webkitURL;
        const contentDisposition = response.headers.get('content-disposition');
        a.href = url.createObjectURL(response.body);
        a.download = BackendService.getFilenameFromContentDisposition(contentDisposition);
        // start download
        a.click();
        url.revokeObjectURL(a.href);
      }
    );
  }

  getMaDmpJsonFile(id: number) {
    return this.http.get(this.backendUrl + 'madmp/file/' + id,
      {responseType: 'blob', observe: 'response'}).subscribe(
      response => {
        const a = document.createElement('a');
        const url = URL || webkitURL;
        const contentDisposition = response.headers.get('content-disposition')
        a.href = url.createObjectURL(response.body);
        a.download = BackendService.getFilenameFromContentDisposition(contentDisposition);
        // start download
        a.click();
        url.revokeObjectURL(a.href);
      }
    );
  }


  private handleError(message = 'Failed to load resource.') {
    return (error: HttpErrorResponse) => {
      if (error.status === 0) {
        message += '\nService can not be reached, please retry later. If the issue persists contact [insert contact for technical issue].'
      } else if (error.status === 404) {
        message += '\nThe requested resource could not be found.'
      } else if (error.status === 500) {
        message += '\nAn error occurred, please contact [insert contact for technical issue].'
      } else if (error.status === 503) {
        message += '\nService is currently unavailable, please retry later.'
      }
      this.feedbackService.error(message);
      return throwError(message);
    };
  }
}
