import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../domain/config';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient,
              private oauthService: OAuthService) {
  }

  private static getHost(): string {
    if (isDevMode()) {
      return 'http://localhost:8080/';
    }
    return `${window.location.origin}/api`;
  }

  public initializeApp(): Promise<boolean> {
    return this.loadConfig().toPromise().then(
      (config: Config) => {
        const authConfig: AuthConfig = {
          issuer: config.authUrl,
          clientId: config.authClient,
          redirectUri: window.location.origin,
          oidc: true,
          scope: config.authScope,
          // useSilentRefresh: true,
          responseType: 'code',
          showDebugInformation: isDevMode(),
          // sessionChecksEnabled: true,
        }
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh();
        return this.oauthService.loadDiscoveryDocumentAndLogin();
      }
    )
  }

  private loadConfig(): Observable<Config> {
    const host = ConfigService.getHost();
    return this.http.get<Config>(`${host}/config`);
  }
}
