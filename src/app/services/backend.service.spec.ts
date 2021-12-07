import {TestBed} from '@angular/core/testing';
import {BackendService} from './backend.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FeedbackService} from './feedback.service';
import {environment} from '../../environments/environment';
import {Project} from '../domain/project';
import {ProjectMember} from '../domain/project-member';
import {Dmp} from '../domain/dmp';

describe('BackendService', () => {
  let service: BackendService;
  let httpTestingController: HttpTestingController;
  let feedbackServiceSpy: jasmine.SpyObj<FeedbackService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FeedbackService', ['error', 'success']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: FeedbackService, useValue: spy}]
    });
    service = TestBed.inject(BackendService);
    feedbackServiceSpy = TestBed.inject(FeedbackService) as jasmine.SpyObj<FeedbackService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all dmps for user', () => {
    service.getDmps().subscribe(
      dmps => {
        expect(dmps).toBeTruthy();
        expect(dmps.length).toBe(1);

        const dmp = dmps.find(item => item.id === 1);
        expect(dmp.project.title).toBe('Random Dmp');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}dmps/list`);
    req.flush([{id: 1, project: {title: 'Random Dmp'}}]);
  });

  it('should retrieve dmp for user', () => {
    service.getDmpById(0).subscribe(
      (dmp: Dmp) => {
        expect(dmp).toBeTruthy();

        expect(dmp.id).toBe(1);
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}dmps/0`);
    req.flush({id: 1, project: {title: 'Random Dmp'}});
  });


  it('should retrieve all repositories', () => {
    service.getRepositories().subscribe(
      repos => {
        expect(repos).toBeTruthy();
        expect(repos.length).toBe(1);

        const repo = repos.find(item => item.id === 'r3d100012810');
        expect(repo.name).toBe('Random Repo');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}repositories`);
    req.flush([{id: 'r3d100012810', name: 'Random Repo'}]);
  });

  /*  it('should retrieve repository by Id', () => {
      const id = 'r3d100012810';
      service.getRepositoryById(id).subscribe(
        repos => {
          expect(repos).toBeTruthy();
          expect(repos.length).toBe(1);
          expect(repos[0].id).toBe('r3d100012810');
        }
      );

      const req = httpTestingController.expectOne(`${environment.backendUrl}repositories/${id}`);
      req.flush([{id: 'r3d100012810', name: 'Random Repo'}]);
    });*/

  it('should get all suggested projects', () => {
    service.getSuggestedProjects().subscribe(
      (projects: Project[]) => {
        expect(projects).toBeTruthy();
        expect(projects.length).toBe(1,);

        const project = projects[0];
        expect(project.title).toBe('Mock project');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}projects`);
    req.flush([{id: null, universityId: 1234, title: 'Mock project'}]);
  });


  it('should get all project members', () => {
    service.getProjectMembers(1234).subscribe(
      (projectsMember: ProjectMember[]) => {
        expect(projectsMember).toBeTruthy();
        expect(projectsMember.length).toBe(1);

        const member = projectsMember[0];
        expect(member.roleInProject).toBe('Random member');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}projects/1234/staff`);
    req.flush([{person: [{id: null, universityId: 1234}], roleInProject: 'Random member'}]);
  });


  it('should search repositories by filters', () => {
    service.searchRepository({subjects: ['Cars']}).subscribe(
      repos => {
        expect(repos).toBeTruthy();
        expect(repos.length).toBe(2);
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}repositories/search?subjects=Cars`);
    expect(req.request.params.get('subjects')).toEqual('Cars');
    req.flush([{}, {}]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
