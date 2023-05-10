import { AuthService } from '../../../../../libs/damap/src';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class TuGrazAuthService extends AuthService {

  constructor(private _oAuthService: OAuthService) {
    super(_oAuthService);
  }

  isAdmin(): boolean {
    const parts: string[] = this._oAuthService.getAccessToken().split('.');
    const tokenBody: any = JSON.parse('' + window.atob(parts[1]));
    return tokenBody.resource_access?.[this._oAuthService.clientId ?? ""]?.roles?.includes('Damap Admin');
  }
}
