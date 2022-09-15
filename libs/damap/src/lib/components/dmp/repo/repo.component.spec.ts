import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepoComponent} from './repo.component';
import {StepIntroComponent} from '../../../widgets/step-intro/step-intro.component';
import {TranslateTestingModule} from '../../../testing/translate-testing/translate-testing.module';
import {provideMockStore} from '@ngrx/store/testing';
import {LoadingState} from '../../../domain/enum/loading-state.enum';
import {selectRepositoriesLoaded} from '../../../store/selectors/repository.selectors';
import {UntypedFormArray} from '@angular/forms';

describe('RepoComponent', () => {
  let component: RepoComponent;
  let fixture: ComponentFixture<RepoComponent>;
  const initialState = {
    form: {dmp: null, changed: false},
    repositories: {ids: [], entities: {}, filters: [], loaded: LoadingState.LOADED}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [RepoComponent, StepIntroComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [{
            selector: selectRepositoriesLoaded,
            value: LoadingState.NOT_LOADED
          }]
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoComponent);
    component = fixture.componentInstance;
    component.repoStep = new UntypedFormArray([]);
    component.datasets = new UntypedFormArray([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
