const configureServer = require("./src/server/config/configure");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const IgnorePlugin = require("webpack").IgnorePlugin;

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production")
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          // ...webpack-bundle-analyzer options here
        }
      ]);
    config.plugin("webpack-moment-lite").use(IgnorePlugin, [
      {
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }
    ]);
  },
  devServer: {
    before: configureServer
  }
};
