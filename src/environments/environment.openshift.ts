import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: $KEYCLOAK.DAMAP_KEYCLOAK_OPENSHIFT,
  realm: $KEYCLOAK.DAMAP_REALM_DEV,
  clientId: $KEYCLOAK.DAMAP_CLIENT_ID_DEV
};

export const environment = {
  production: false,
  backendUrl: $BACKEND.DAMAP_OPENSHIFT,
  keycloakConfig
};
