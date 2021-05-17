declare var $KEYCLOAK: KEYCLOAK;
declare var $BACKEND: BACKEND;
interface KEYCLOAK {
  DAMAP_KEYCLOAK_DEV: string;
  DAMAP_KEYCLOAK_OPENSHIFT: string;
  DAMAP_KEYCLOAK_PROD: string;
  DAMAP_REALM_DEV: string;
  DAMAP_CLIENT_ID_DEV: string;
  DAMAP_REALM_PROD: string;
  DAMAP_CLIENT_ID_PROD: string;
  }
interface BACKEND {
  DAMAP_OPENSHIFT: string;
  DAMAP_PROD: string;
  DAMAP_DEV: string;
  }
