import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from '@damap/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfigService } from '../../services/config.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    const oauthSpy = jasmine.createSpyObj('OAuthService', [
      'getIdentityClaims',
    ]);
    oauthSpy.getIdentityClaims.and.returnValue({ name: 'name' });
    const configSpy = jasmine.createSpyObj('ConfigService', ['getEnvironment']);
    configSpy.getEnvironment.and.returnValue('DEV');

    await TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        NoopAnimationsModule,
        TranslateTestingModule,
      ],
      declarations: [LayoutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: OAuthService, useValue: oauthSpy },
        { provide: ConfigService, useValue: configSpy },
      ],
    }).compileComponents();
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
