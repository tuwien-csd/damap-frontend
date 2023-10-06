import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Injectable, isDevMode } from '@angular/core';

import { Config } from '@damap/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config;

  constructor(private http: HttpClient, private oauthService: OAuthService) {}

  public initializeApp(): Promise<boolean> {
    return this.loadConfig()
      .toPromise()
      .then((config: Config) => {
        if (!config) {
          // eslint-disable-next-line no-console
          console.error('Config is missing!');
          return new Promise<boolean>(_ => false);
        } else {
          this.config = config;
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
          };
          this.oauthService.configure(authConfig);
          this.oauthService.setupAutomaticSilentRefresh();
          return this.oauthService.loadDiscoveryDocumentAndLogin();
        }
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error(
          'Failed to load config - please make sure your backend is up and running!'
        );
        console.log('Backend: ' + environment.backendurl);
        console.error(error);
        /* eslint-disable no-console */
        return new Promise(_ => false);
      });
  }

  public getEnvironment() {
    return this.config.env;
  }

  private loadConfig(): Observable<Config> {
    const host = environment.backendurl;
    return this.http.get<Config>(`${host}config`);
  }
}
