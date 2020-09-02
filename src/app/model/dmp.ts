import {Project} from "./project";
import {Dataset} from "./dataset";
import {ContributorType} from "./enum/contributor-type.enum";
import {Contributor} from "./contributor";

export class Dmp {
  private readonly _id: number; // backend
  private _title: string; // step 1
  private contactId: number;
  private contactType: ContributorType;
  // private contactName: string;
  // private contactMbox: string;
  private _created: Date;
  private _modified: Date;
  private _description: string; // step 1
  private _projects: Project[]; // step 2
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
  constructor(id?: number, title?: string, projects?: Project[]) {
    this._id = id;
    this._title = title;
    this._projects = projects;
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

  get projects(): Project[] {
    return this._projects;
  }

  get contributors() {
    return this._contributors;
  }

  public addProject(project: Project): void {
    if (this._projects == null) {
      this._projects = [];
    }
    this._projects.push(project);
  }

  public removeProject(project: Project) {
    this._projects = this._projects.filter(p => p !== project);
    if (this._projects == []) {
      this._projects = undefined;
    }
  }

}
