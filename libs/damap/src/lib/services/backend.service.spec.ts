import {TestBed} from '@angular/core/testing';
import {BackendService} from './backend.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FeedbackService} from './feedback.service';
import {Project} from '../domain/project';
import {Dmp} from '../domain/dmp';
import {completeDmp} from '../mocks/dmp-mocks';
import {HttpEventType, HttpHeaders} from '@angular/common/http';
import {TranslateTestingModule} from '../testing/translate-testing/translate-testing.module';
import {Contributor} from '../domain/contributor';
import {closedDatasetMock} from '../mocks/dataset-mocks';
import {APP_ENV} from '../constants';

describe('BackendService', () => {
  let service: BackendService;
  let httpTestingController: HttpTestingController;
  const backendUrl = APP_ENV.backendurl;
  let feedbackServiceSpy: jasmine.SpyObj<FeedbackService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FeedbackService', ['error', 'success']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateTestingModule],
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

    const req = httpTestingController.expectOne(`${backendUrl}dmps/list`);
    req.flush([{id: 1, project: {title: 'Random Dmp'}}]);
  });

  it('should retrieve dmp for user', () => {
    service.getDmpById(0).subscribe(
      (dmp: Dmp) => {
        expect(dmp).toBeTruthy();

        expect(dmp.id).toBe(1);
      }
    );

    const req = httpTestingController.expectOne(`${backendUrl}dmps/0`);
    req.flush({id: 1, project: {title: 'Random Dmp'}});
  });

  it('should create dmp', () => {
    service.createDmp(completeDmp).subscribe(
      (dmp: Dmp) => {
        expect(dmp.id).toBe(1);
      }
    );

    const req = httpTestingController.expectOne(`${backendUrl}dmps`);
    expect(req.request.method).toBe('POST');
    req.flush({id: 1});
  });

  it('should update dmp', () => {
    service.editDmp(completeDmp).subscribe(
      (dmp: Dmp) => {
        expect(dmp.id).toBe(76);
      }
    );

    const req = httpTestingController.expectOne(`${backendUrl}dmps/${completeDmp.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(completeDmp);
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

    const req = httpTestingController.expectOne(`${backendUrl}repositories`);
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

      const req = httpTestingController.expectOne(`${backendUrl}repositories/${id}`);
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

    const req = httpTestingController.expectOne(`${backendUrl}projects`);
    req.flush([{id: null, universityId: 1234, title: 'Mock project'}]);
  });


  it('should get all project members', () => {
    service.getProjectMembers(1234).subscribe(
      (projectsMember: Contributor[]) => {
        expect(projectsMember).toBeTruthy();
        expect(projectsMember.length).toBe(1);

        const member = projectsMember[0];
        expect(member.roleInProject).toBe('Random member');
      }
    );

    const req = httpTestingController.expectOne(`${backendUrl}projects/1234/staff`);
    req.flush([{person: [{id: null, universityId: 1234}], roleInProject: 'Random member'}]);
  });


  it('should search repositories by filters', () => {
    service.searchRepository({subjects: ['Cars']}).subscribe(
      repos => {
        expect(repos).toBeTruthy();
        expect(repos.length).toBe(2);
      }
    );

    const req = httpTestingController.expectOne(`${backendUrl}repositories/search?subjects=Cars`);
    expect(req.request.params.get('subjects')).toEqual('Cars');
    req.flush([{}, {}]);
  });

  it('should upload file for analysis', () => {
    const mockFile = new FormData();
    mockFile.append('file', new Blob());
    service.analyseFileData(mockFile).subscribe(
      response => {
        if (response.type === HttpEventType.UploadProgress) {
          expect(response.loaded).toEqual(7);
          expect(response.total).toEqual(10);
        }
        if (response.type === HttpEventType.Response) {
          expect(response.body.title).toEqual('file');
        }
      }
    );

    const req = httpTestingController.expectOne(`${backendUrl}fits/examine`);
    expect(req.request.method).toEqual('POST');
    req.event({type: HttpEventType.UploadProgress, loaded: 7, total: 10});
    req.event({
      type: HttpEventType.Response, body: {title: 'file'}, status: 200, headers: new HttpHeaders(),
      statusText: 'OK', url: '', ok: true, clone: null
    });
  });

  it('should search dataset by doi', () => {
    const doi = '10.1234/test';
    service.searchDataset(doi).subscribe(value => {
      expect(value).toBeTruthy();
      expect(value).toBe(closedDatasetMock);
    });

    const req = httpTestingController.expectOne(`${backendUrl}openaire?doi=${doi}`);
    expect(req.request.method).toBe('GET');
    req.flush(closedDatasetMock);
  });

  it('should get dmp document', () => {
    const spyObj = jasmine.createSpyObj('a', ['click']);
    spyOn(document, 'createElement').and.returnValue(spyObj);

    service.getDmpDocument(1);
    const req = httpTestingController.expectOne(`${backendUrl}document/1`);
    req.flush(new Blob(), {headers: new HttpHeaders({'content-disposition': 'filename=any.docx'})})

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');

    expect(spyObj.download).toBe('any.docx');
    expect(spyObj.click).toHaveBeenCalledTimes(1);
    expect(spyObj.click).toHaveBeenCalledWith();

  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
