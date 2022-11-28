import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

describe('AuthService', () => {
  let service: AuthService;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpyObj('OAuthService', ['getAccessToken', 'hasValidAccessToken', 'getIdentityClaims']);
    TestBed.configureTestingModule({
      providers: [{provide: OAuthService, useValue: spy}]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return name and username', () => {
    spy.getIdentityClaims.and.returnValue({"name": "name", "preferred_username": "username"});
    expect(service.getUsername()).toEqual('username');
    expect(service.getName()).toEqual('name');
  })

  it('should check if is admin', () => {
    spy.getAccessToken.and.returnValue('.' + window.btoa('{ "realm_access": { "roles": [ "Damap Admin" ] }}'));
    expect(service.isAdmin()).toBeTrue();

    spy.getAccessToken.and.returnValue('.' + window.btoa('{ "realm_access": { "roles": [] }}'));
    expect(service.isAdmin()).toBeFalse();
  })
});

