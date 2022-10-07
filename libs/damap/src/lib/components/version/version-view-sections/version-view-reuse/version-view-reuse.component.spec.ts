import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VersionViewReuseComponent} from './version-view-reuse.component';
import {TranslateTestingModule} from '../../../../testing/translate-testing/translate-testing.module';

describe('VersionViewReuseComponent', () => {
  let component: VersionViewReuseComponent;
  let fixture: ComponentFixture<VersionViewReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionViewReuseComponent],
      imports: [TranslateTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionViewReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
