const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $KEYCLOAK: { DAMAP_KEYCLOAK_DEV : JSON.stringify(process.env.DAMAP_KEYCLOAK_DEV), DAMAP_KEYCLOAK_OPENSHIFT : JSON.stringify(process.env.DAMAP_KEYCLOAK_OPENSHIFT), DAMAP_KEYCLOAK_PROD : JSON.stringify(process.env.DAMAP_KEYCLOAK_PROD) },
      $BACKEND: { DAMAP_OPENSHIFT : JSON.stringify(process.env.DAMAP_OPENSHIFT), DAMAP_PROD : JSON.stringify(process.env.DAMAP_PROD) }
    })
  ]
};
