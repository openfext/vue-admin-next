const path = require('path');

const isProdMode = process.env.NODE_ENV === 'production';

const config = {
  publicPath: isProdMode ? '/vue-admin-next' : '/',
  css: {},
  filenameHashing: true
};

if (!isProdMode) {
  config.css.extract = false;
}

config.chainWebpack = webpackConfig => {};

config.configureWebpack = () => ({
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: `js/[name].[hash].js`,
    chunkFilename: `js/[name].[hash].js`
  }
});

module.exports = config;
