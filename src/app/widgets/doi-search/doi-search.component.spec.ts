import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoiSearchComponent} from './doi-search.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {restrictedDatasetMock} from '../../mocks/dataset-mocks';
import {LoadingState} from '../../domain/enum/loading-state.enum';

describe('DoiSearchComponent', () => {
  let component: DoiSearchComponent;
  let fixture: ComponentFixture<DoiSearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, MatFormFieldModule, MatInputModule,
        MatIconModule, NoopAnimationsModule],
      declarations: [DoiSearchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoiSearchComponent);
    component = fixture.componentInstance;
    component.result = restrictedDatasetMock;
    component.loading = LoadingState.NOT_LOADED;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('extract the correct doi search term and search for it', () => {
    spyOn(component.termToSearch, 'emit');
    const doi = ' doi: 10.12345/12345 ';
    const searchTerm = '10.12345/12345';
    component.search(doi);
    expect(component.termToSearch.emit).toHaveBeenCalledOnceWith(searchTerm);
  });
});
