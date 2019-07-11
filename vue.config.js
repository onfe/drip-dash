const configureServer = require("./src/server/config/configure");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  devServer: {
    before: configureServer
  }
};
