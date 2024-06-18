import { AuthConfig, OAuthService, OAuthSuccessEvent } from "angular-oauth2-oidc";
import { Injectable, isDevMode } from '@angular/core';

import { Config } from '@damap/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config;

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService,
    private router: Router,
  ) {}

  public initializeApp(): void {
    this.loadConfig()
      .then((config: Config) => {
        if (!config) {
          // eslint-disable-next-line no-console
          console.error('Config is missing!');
          return new Promise<boolean>(_ => false);
        } else {
          console.log(this.oauthService.state);
          this.config = config;
          const authConfig: AuthConfig = {
            issuer: config.authUrl,
            clientId: config.authClient,
            redirectUri: window.location.origin,
            logoutUrl: window.location.origin,
            oidc: true,
            scope: config.authScope,
            // useSilentRefresh: true,
            responseType: 'code',
            showDebugInformation: isDevMode(),
            // sessionChecksEnabled: true,
          };
          this.oauthService.configure(authConfig);
          this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
              const url = decodeURIComponent(this.oauthService.state);
              this.router.navigateByUrl(url);
            }
          });
          this.oauthService.setupAutomaticSilentRefresh();
          return new Promise<boolean>(_ => true);
        }
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error(
          'Failed to load config - please make sure your backend is up and running!',
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

  private async loadConfig(): Promise<Config> {
    const host = environment.backendurl;
    const config$ = this.http.get<Config>(`${host}config`);
    return await lastValueFrom(config$);
  }
}
