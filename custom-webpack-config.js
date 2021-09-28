const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $BACKEND: {
        DAMAP_OPENSHIFT : JSON.stringify(process.env.DAMAP_OPENSHIFT),
        DAMAP_PROD : JSON.stringify(process.env.DAMAP_PROD),
        DAMAP_DEV: JSON.stringify(process.env.DAMAP_DEV)
        }
    })
  ]
};
