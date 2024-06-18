import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oAuthService: OAuthService) {}

  getName(): string {
    const claims = this.oAuthService.getIdentityClaims();
    return claims['name'];
  }

  getUsername(): string {
    const claims = this.oAuthService.getIdentityClaims();
    return claims['preferred_username'];
  }

  isAuthenticated(route: string): boolean {
    const isAuthenticated = this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken();
    if (!isAuthenticated) {
      this.oAuthService.initLoginFlow(route);
    }
    return (isAuthenticated);
  }

  isAdmin(): boolean {
    const parts: string[] = this.oAuthService.getAccessToken().split('.');
    const tokenBody: any = JSON.parse('' + window.atob(parts[1]));
    return tokenBody.realm_access?.roles?.includes('Damap Admin');
  }

  logout() {
    this.oAuthService.logOut();
  }
}
