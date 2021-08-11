import {TestBed} from '@angular/core/testing';
import {BackendService} from './backend.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FeedbackService} from './feedback.service';
import {environment} from '../../environments/environment';

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
        expect(dmps).toBeTruthy('No dmps returned');
        expect(dmps.length).toBe(1, 'Incorrect number of dmps');

        const dmp = dmps.find(item => item.id === 1);
        expect(dmp.project.title).toBe('Random Dmp');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}dmps/list`);
    req.flush([{id: 1, project:{title: 'Random Dmp'}}]);
  });


  it('should retrieve all repositories', () => {
    service.getRepositories().subscribe(
      repos => {
        expect(repos).toBeTruthy('No repos returned');
        expect(repos.length).toBe(1, 'Incorrect number of repos');

        const repo = repos.find(item => item.id === 'r3d100012810');
        expect(repo.name).toBe('Random Repo');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}repositories`);
    req.flush([{id: 'r3d100012810', name: 'Random Repo'}]);
  });

  it('should search repositories by filters', () => {
    service.searchRepository({subjects: ['Cars']}).subscribe(
      repos => {
        expect(repos).toBeTruthy('No repos returned');
        expect(repos.length).toBe(2, 'Incorrect number of repos');
      }
    );

    const req = httpTestingController.expectOne(`${environment.backendUrl}repositories/search?subjects=Cars`);
    expect(req.request.params.get('subjects')).toEqual('Cars');
    req.flush([{},{}]);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
