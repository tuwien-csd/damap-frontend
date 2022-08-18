import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DmpActionsComponent, SaveVersionDialogComponent} from './dmp-actions.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {FormTestingModule} from '../../testing/form-testing/form-testing.module';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Subject} from 'rxjs';
import {Dmp} from '../../domain/dmp';

describe('ActionsComponent', () => {
  let component: DmpActionsComponent;
  let fixture: ComponentFixture<DmpActionsComponent>;
  let store: MockStore<{
    form: { dmp: Dmp, changed: boolean },
    dmps: { saving: boolean }
  }>;
  const initialState = {
    form: {dmp: null, changed: false},
    dmps: {saving: false}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule, MatDialogModule,
        NoopAnimationsModule,
        TranslateTestingModule,
        FormTestingModule
      ],
      declarations: [DmpActionsComponent, SaveVersionDialogComponent],
      providers: [
        provideMockStore({initialState})
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmpActionsComponent);
    component = fixture.componentInstance;
    component.stepChanged$ = new Subject<any>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save dmp on step and form change', async () => {
    spyOn(component, 'saveDmp').and.callThrough();
    spyOn(store, 'dispatch');

    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledTimes(0);

    component.formChanged = true;
    component.stepChanged$.next(null);

    expect(component.saveDmp).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
