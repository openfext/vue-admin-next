const path = require('path');

const isProdMode = process.env.NODE_ENV === 'production';

const config = {
  css: {},
  filenameHashing: false
};

if (!isProdMode) {
  config.css.extract = false;
}

config.chainWebpack = webpackConfig => {};

config.configureWebpack = () => ({
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: `js/[name].js`,
    chunkFilename: `js/[name].js`
  }
});

module.exports = config;
