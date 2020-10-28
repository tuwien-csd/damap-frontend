import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: $KEYCLOAK.DAMAP_KEYCLOAK_PROD,
  realm: 'quarkus',
  clientId: 'dmap'
};

export const environment = {
  production: false,
  backendUrl: $BACKEND.DAMAP_PROD,
  keycloakConfig
};
