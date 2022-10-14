import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Dmp} from '../domain/dmp';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {Contributor} from '../domain/contributor';
import {Project} from '../domain/project';
import {DmpListItem} from '../domain/dmp-list-item';
import {RepositoryDetails} from '../domain/repository-details';
import {catchError, map, retry, shareReplay} from 'rxjs/operators';
import {FeedbackService} from './feedback.service';
import {TranslateService} from '@ngx-translate/core';
import {Consent} from '../domain/consent'
import {InternalStorage} from '../domain/internal-storage';
import {Version} from '../domain/version';
import {Dataset} from '../domain/dataset';
import {APP_ENV} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = APP_ENV.backendurl;
  private dmpBackendUrl = this.backendUrl + 'dmps';
  private versionBackendUrl = this.backendUrl + 'versions';
  private projectBackendUrl = this.backendUrl + 'projects';
  private repositoryBackendUrl = this.backendUrl + 'repositories';

  constructor(
    private http: HttpClient,
    private feedbackService: FeedbackService,
    private translate: TranslateService) {
  }

  private static getFilenameFromContentDisposition(contentDisposition: string): string {
    const start = contentDisposition.lastIndexOf('filename=');
    return contentDisposition.substring(start + 9);
  }

  getDmps(): Observable<DmpListItem[]> {
    return this.http.get<DmpListItem[]>(`${this.dmpBackendUrl}/list`).pipe(
      retry(3),
      catchError(this.handleError('http.error.plans.load.yours'))
    );
  }

  getAllDmps(): Observable<DmpListItem[]> {
    return this.http.get<DmpListItem[]>(`${this.dmpBackendUrl}/all`).pipe(
      retry(3),
      catchError(this.handleError('http.error.plans.load.all'))
    );
  }

  getDmpById(id: number): Observable<Dmp> {
    return this.http.get<Dmp>(`${this.dmpBackendUrl}/${id}`).pipe(
      retry(3),
      catchError(this.handleError('http.error.plans.load.one'))
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
        catchError(this.handleError('http.error.plans.save'))
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
        catchError(this.handleError('http.error.plans.update'))
      );
  }

  getDmpByIdAndRevision(id: number, revision: number): Observable<Dmp> {
    return this.http.get<Dmp>(`${this.dmpBackendUrl}/${id}/${revision}`).pipe(
      retry(3),
      catchError(this.handleError('http.error.versions.revision'))
    );
  }

  getDmpVersions(id: number): Observable<Version[]> {
    return this.http.get<Version[]>(`${this.versionBackendUrl}/list/${id}`).pipe(
      retry(3),
      catchError(this.handleError('http.error.versions.load'))
    );
  }

  saveDmpVersion(version: Version): Observable<Version> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Version>(this.versionBackendUrl, version, httpOptions).pipe(
      retry(3),
      catchError(this.handleError('http.error.versions.save'))
    );
  }

  getSuggestedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectBackendUrl).pipe(
      retry(3),
      catchError(this.handleError('http.error.projects')),
      shareReplay(1)
    );
  }

  getProjectMembers(projectId: number): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.projectBackendUrl}/${projectId}/staff`).pipe(
      retry(3),
      catchError(this.handleError('http.error.projectmembers'))
    );

  }

  searchPerson(term: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.backendUrl}persons/search?q=${term}`).pipe(
      catchError(this.handleError('http.error.person.search'))
    )
  }

  getInternalStorages(): Observable<InternalStorage[]> {
    const langCode = 'eng'; // TODO: Replace with template lang in the future
    return this.http.get<InternalStorage[]>(`${this.backendUrl}storages/${langCode}`).pipe(
      retry(3),
      catchError(this.handleError('http.error.storages'))
    );
  }

  getRepositories(): Observable<RepositoryDetails[]> {
    return this.http.get<RepositoryDetails[]>(this.repositoryBackendUrl).pipe(
      retry(3),
      catchError(this.handleError('http.error.repositories.all'))
    );
  }

  getRecommendedRepositories(): Observable<RepositoryDetails[]> {
    return this.http.get<RepositoryDetails[]>(`${this.repositoryBackendUrl}/recommended`).pipe(
      retry(3),
      catchError(this.handleError('http.error.repositories.recommended'))
    );
  }

  getRepositoryById(id: string): Observable<{ id: string, changes: RepositoryDetails }> {
    return this.http.get<RepositoryDetails>(`${this.repositoryBackendUrl}/${id}`).pipe(
      map(repo => ({id, changes: repo})),
      retry(3),
      catchError(this.handleError('http.error.repositories.one'))
    );
  }

  searchRepository(filters: any): Observable<RepositoryDetails[]> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        filters[key]?.forEach(item => params = params.append(key, item));
      }
    }
    return this.http.get<RepositoryDetails[]>(`${this.repositoryBackendUrl}/search`, {params}).pipe(
      catchError(this.handleError('http.error.repositories.search'))
    );
  }

  analyseFileData(file: FormData): Observable<HttpEvent<any>> {
    return this.http.post(`${this.backendUrl}fits/examine`, file,
      {reportProgress: true, observe: 'events'})
      .pipe(
        catchError(this.handleError('http.error.fileanalysis'))
      );
  }

  searchDataset(term: string): Observable<Dataset> {
    return this.http.get<Dataset>(`${this.backendUrl}openaire?doi=${term}`).pipe(
      retry(3),
      catchError(this.handleError('http.error.openaire'))
    );
  }

  getDmpDocument(id: number): void {
    this.http.get(this.backendUrl + 'document/' + id,
      {responseType: 'blob', observe: 'response'}).pipe(
      catchError(this.handleError('http.error.document'))
    ).subscribe(
      {
        next: response => this.downloadFile(response)
      }
    );
  }

  getMaDmpJsonFile(id: number): void {
    this.http.get(this.backendUrl + 'madmp/file/' + id,
      {responseType: 'blob', observe: 'response'}).pipe(
      catchError(this.handleError('http.error.document'))
    ).subscribe(
      {
        next: response => this.downloadFile(response)
      }
    );
  }

  getConsentGiven(): Observable<boolean> {
    return this.http.get<Consent>(`${this.backendUrl}consent`).pipe(
      map(details => details.consentGiven),
      retry(3),
      catchError(this.handleError('http.error.consent.one'))
    );
  }

  editConsent(consent: Consent): Observable<Consent> {
    return this.http.post<Consent>(`${this.backendUrl}consent`, consent)
      .pipe(
        retry(3),
        catchError(this.handleError('http.error.consent.edit'))
      );
  }

  private handleError(message = 'http.error.standard') {
    message = this.translate.instant(message);
    return (error: HttpErrorResponse) => {
      if (error.status === 0) {
        this.translate.instant('http.error.0');
      } else if (error.status === 404) {
        message += this.translate.instant('http.error.404');
      } else if (error.status === 500) {
        message += this.translate.instant('http.error.500');
      } else if (error.status === 503) {
        message += this.translate.instant('http.error.503');
      }
      this.feedbackService.error(message);
      throw new HttpErrorResponse({statusText: message});
    };
  }

  private downloadFile(response: any) {
    const a = document.createElement('a');
    const url = URL || webkitURL;
    const contentDisposition = response.headers.get('content-disposition')
    a.href = url.createObjectURL(response.body);
    a.download = BackendService.getFilenameFromContentDisposition(contentDisposition);
    // start download
    a.click();
    url.revokeObjectURL(a.href);
  }
}
