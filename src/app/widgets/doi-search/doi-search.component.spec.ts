import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DoiSearchComponent} from './doi-search.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {restrictedDatasetMock} from '../../mocks/dataset-mocks';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {SimpleChange} from '@angular/core';

describe('DoiSearchComponent', () => {
  let component: DoiSearchComponent;
  let fixture: ComponentFixture<DoiSearchComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should en-/disable the form control depending on the loading state', () => {
    spyOn(component.doi, 'setValue');
    spyOn(component.doi, 'enable');
    spyOn(component.doi, 'disable');

    component.loading = LoadingState.NOT_LOADED;
    expect(component.doi.disabled).toBe(false);

    component.loading = LoadingState.LOADING;
    component.ngOnChanges({loading: new SimpleChange(LoadingState.NOT_LOADED, LoadingState.LOADING, true)});
    expect(component.loading).toBe(LoadingState.LOADING);
    expect(component.doi.disable).toHaveBeenCalledTimes(1);

    component.loading = LoadingState.LOADED;
    component.ngOnChanges({loading: new SimpleChange(LoadingState.LOADING, LoadingState.LOADED, false)});
    expect(component.doi.setValue).toHaveBeenCalledTimes(1);
    expect(component.doi.enable).toHaveBeenCalledTimes(1);
  });

  it('extract the correct doi search term and search for it', () => {
    spyOn(component.termToSearch, 'emit');
    const doi = ' doi: 10.12345/12345 ';
    const searchTerm = '10.12345/12345';
    component.search(doi);
    expect(component.termToSearch.emit).toHaveBeenCalledOnceWith(searchTerm);
  });
});
