import {Project} from "./project";
import {Dataset} from "./dataset";
import {Contributor} from "./contributor";

export class Dmp {
  private readonly _id: number; // backend
  private _title: string; // step 1
  private _contact: Contributor;
  private _created: Date;
  private _modified: Date;
  private _description: string; // step 1
  private _project: Project; // step 2
  private _contributors: Contributor[]; // step 3
  private datasets: Dataset[]; // step 4
  private language; // step 1
  private dmpId; // ?
  private dmpIdType; // ?
  private ethicalIssuesExist: boolean; // step 6
  private ethicalIssuesDescription; // step 6
  private ethicalIssuesReport; // step 6
  private costs; // ?

  // fixme: temp constructor for mock-data
  constructor(id?: number, title?: string, project?: Project) {
    this._id = id;
    this._title = title;
    this._project = project;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get contact(): Contributor {
    return this._contact;
  }

  set contact(value: Contributor) {
    this._contact = value;
  }

  get created(): Date {
    return this._created;
  }

  get modified(): Date {
    return this._modified;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get project(): Project{
    return this._project;
  }

  set project(value: Project){
    this._project = value;
  }

  get contributors() {
    return this._contributors;
  }

  // TODO
  public addContributor(contributor: Contributor): void {
    if (this._contributors == null) {
      this._contributors = [];
    }
    this._contributors.push(contributor);
  }

  // TODO
  public removeContributor(contributor: Contributor) {
    this._contributors = this._contributors.filter(c => c !== contributor);
    if (this._contributors == []) {
      this._contributors = undefined;
    }
  }

  // TODO
  public updateContributorRoles(contributorToUpdate: Contributor){

  }

}
