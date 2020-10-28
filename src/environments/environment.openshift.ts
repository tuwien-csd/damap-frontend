import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: $KEYCLOAK.DAMAP_KEYCLOAK_OPENSHIFT,
  realm: 'quarkus',
  clientId: 'dmap'
};

export const environment = {
  production: false,
  backendUrl: $BACKEND.DAMAP_OPENSHIFT,
  keycloakConfig
};
