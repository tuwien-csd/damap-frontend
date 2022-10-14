import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EnvBannerComponent} from './env-banner.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatCardModule} from '@angular/material/card';

describe('EnvBannerComponent', () => {
  let component: EnvBannerComponent;
  let fixture: ComponentFixture<EnvBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, TranslateTestingModule],
      declarations: [EnvBannerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
