import {TestBed} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {OAuthService} from 'angular-oauth2-oidc';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('OAuthService',
      ['configure', 'setupAutomaticSilentRefresh', 'loadDiscoveryDocumentAndLogin']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: OAuthService, useValue: spy}]
    });
    service = TestBed.inject(ConfigService);
    TestBed.inject(OAuthService) as jasmine.SpyObj<OAuthService>;
    TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
