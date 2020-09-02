import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Project} from "../model/project";
import {PROJECTS} from "../mockdata/mock-projects";
import {Dmp} from "../model/dmp";
import {DMPS} from "../mockdata/mock-dmps";
import {HttpClient} from "@angular/common/http";
import {Contributor} from "../model/contributor";
import {PEOPLE} from "../mockdata/mock-people";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = 'localhost:8080';

  constructor(
    private http: HttpClient) {
  }

  getDmps(): Observable<Dmp[]> {
    return of(DMPS);
  }

  getDmpById(id: number): Observable<Dmp> {
    return of(DMPS[0]);
  }

  editDmp(dmp: Dmp): void {

  }

  deleteDmp(id: number): void {

  }

  createDmp(dmp: Dmp): void {

  }

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Project[]>
    (`${this.backendUrl}/?name=${term}`).pipe(
      /*tap(x => x.length ?
        this.log(`found projects matching "${term}"`) :
        this.log(`no projects matching "${term}"`)),
      catchError(this.handleError<Project[]>('searchProjects', []))*/
    );
  }

  getPersons(): Observable<Contributor[]>  {
    return of(PEOPLE);
  }

  searchPerson(term: string) {

  }
}
