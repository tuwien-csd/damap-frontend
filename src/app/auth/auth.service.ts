import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oAuthService: OAuthService) { }

  hasValidAccessToken() {
    return this.oAuthService.hasValidAccessToken();
  }

  isAdmin(): boolean {
    const parts: string[] = this.oAuthService.getAccessToken().split('.');
    const tokenBody: any = JSON.parse('' + atob(parts[1]));
    return tokenBody.realm_access?.roles?.includes('Damap Admin');
  }
}
