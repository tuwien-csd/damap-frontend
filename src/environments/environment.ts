// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {AuthConfig} from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: $KEYCLOAK.DAMAP_KEYCLOAK_DEV + '/realms/' + $KEYCLOAK.DAMAP_REALM_DEV,
  clientId: $KEYCLOAK.DAMAP_CLIENT_ID_DEV,
  redirectUri: window.location.origin,
  oidc: true,
  scope: 'openid profile email offline_access microprofile-jwt roles tissID',
  useSilentRefresh: true,
  responseType: 'code',
  showDebugInformation: true,
  // sessionChecksEnabled: true,
}

export const environment = {
  production: false,
  backendUrl: $BACKEND.DAMAP_DEV,
  authConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
