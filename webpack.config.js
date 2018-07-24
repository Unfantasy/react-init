const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return devConfig;
  }

  if (argv.mode === 'production') {
    return prodConfig;
  }
}
