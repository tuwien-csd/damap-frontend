import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Project} from "../model/project";
import {PROJECTS} from "../mockdata/mock-projects";
import {Dmp} from "../model/dmp";
import {DMPS} from "../mockdata/mock-dmps";
import {HttpClient} from "@angular/common/http";
import {Contributor} from "../model/contributor";
import {PEOPLE} from "../mockdata/mock-people";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = environment.backendUrl;
  private repositoryBackendUrl = this.backendUrl  + "/repositories"

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

  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }

  getPersons(): Observable<Contributor[]> {
    return of(PEOPLE);
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
