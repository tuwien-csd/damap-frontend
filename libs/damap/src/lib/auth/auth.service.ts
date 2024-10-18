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

  getDisplayName(): string {
    const claims = this.oAuthService.getIdentityClaims();
    const {
      name,
      given_name: firstName,
      family_name: lastName,
      email,
    } = claims;

    const displayName =
      name ||
      (firstName && lastName ? `${firstName} ${lastName}` : null) ||
      email ||
      '';
    return displayName;
  }

  getUsername(): string {
    const claims = this.oAuthService.getIdentityClaims();
    return claims['preferred_username'];
  }

  isAuthenticated(): boolean {
    return (
      this.oAuthService.hasValidIdToken() &&
      this.oAuthService.hasValidAccessToken()
    );
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
