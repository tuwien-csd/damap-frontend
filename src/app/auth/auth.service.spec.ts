import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

describe('AuthService', () => {
  let service: AuthService;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpyObj('OAuthService', ['getAccessToken', 'hasValidAccessToken']);
    TestBed.configureTestingModule({
      providers: [{provide: OAuthService, useValue: spy}]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if is admin', () => {
    spy.getAccessToken.and.returnValue('.' + btoa('{ "realm_access": { "roles": [ "Damap Admin" ] }}'));
    expect(service.isAdmin()).toBeTrue();

    spy.getAccessToken.and.returnValue('.' + btoa('{ "realm_access": { "roles": [] }}'));
    expect(service.isAdmin()).toBeFalse();
  })
});

