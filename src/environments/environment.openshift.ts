import {AuthConfig} from 'angular-oauth2-oidc';

const authConfig: AuthConfig = {
  issuer: $KEYCLOAK.DAMAP_KEYCLOAK_OPENSHIFT + '/realms/' + $KEYCLOAK.DAMAP_REALM_PROD,
  clientId: $KEYCLOAK.DAMAP_CLIENT_ID_PROD,
  redirectUri: window.location.origin,
  oidc: true,
  scope: 'openid profile email offline_access microprofile-jwt roles tissID',
  useSilentRefresh: true,
  responseType: 'code',
  showDebugInformation: false,
  // sessionChecksEnabled: true,
}

export const environment = {
  production: false,
  backendUrl: $BACKEND.DAMAP_OPENSHIFT,
  authConfig
};
