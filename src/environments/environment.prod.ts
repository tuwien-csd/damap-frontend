import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: $KEYCLOAK.DAMAP_KEYCLOAK_PROD,
  realm: $KEYCLOAK.DAMAP_REALM_PROD,
  clientId: $KEYCLOAK.DAMAP_CLIENT_ID_PROD
};

export const environment = {
  production: false,
  backendUrl: $BACKEND.DAMAP_PROD,
  keycloakConfig
};
