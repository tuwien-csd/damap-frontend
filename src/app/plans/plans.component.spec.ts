import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlansComponent} from './plans.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {BackendService} from '../services/backend.service';

describe('PlanComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;
  let store: MockStore;
  const initialState = {dmps: {loaded: true}};

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BackendService', ['getDmpDocument', 'getMaDmpJsonFile']);
    await TestBed.configureTestingModule({
      declarations: [PlansComponent],
      providers: [
        provideMockStore({initialState}),
        {provide: BackendService, useValue: spy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
