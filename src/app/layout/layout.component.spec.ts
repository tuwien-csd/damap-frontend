import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutComponent} from './layout.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {TranslateService} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from '../testing/translate-testing/translate-testing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    const oauthSpy = jasmine.createSpyObj('OAuthService', ['getIdentityClaims']);
    const translateSpy = jasmine.createSpyObj('TranslateService', ['use']);
    oauthSpy.getIdentityClaims.and.returnValue({name: 'name'});
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, MatSidenavModule, MatToolbarModule, MatMenuModule, NoopAnimationsModule],
      declarations: [LayoutComponent],
      providers: [
        {provide: OAuthService, useValue: oauthSpy},
        {provide: TranslateService, useValue: translateSpy}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
