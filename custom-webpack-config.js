const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $KEYCLOAK: {
        DAMAP_KEYCLOAK_DEV : JSON.stringify(process.env.DAMAP_KEYCLOAK_DEV),
        DAMAP_KEYCLOAK_OPENSHIFT : JSON.stringify(process.env.DAMAP_KEYCLOAK_OPENSHIFT),
        DAMAP_KEYCLOAK_PROD : JSON.stringify(process.env.DAMAP_KEYCLOAK_PROD),
        DAMAP_REALM_DEV: JSON.stringify(process.env.DAMAP_REALM_DEV),
        DAMAP_CLIENT_ID_DEV: JSON.stringify(process.env.DAMAP_CLIENT_ID_DEV),
        DAMAP_REALM_PROD: JSON.stringify(process.env.DAMAP_REALM_PROD),
        DAMAP_CLIENT_ID_PROD: JSON.stringify(process.env.DAMAP_CLIENT_ID_PROD)
        },
      $BACKEND: {
        DAMAP_OPENSHIFT : JSON.stringify(process.env.DAMAP_OPENSHIFT),
        DAMAP_PROD : JSON.stringify(process.env.DAMAP_PROD),
        DAMAP_DEV: JSON.stringify(process.env.DAMAP_DEV)
        }
    })
  ]
};
