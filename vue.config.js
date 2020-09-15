const configureServer = require("./src/server/dev");
const IgnorePlugin = require("webpack").IgnorePlugin;

module.exports = {
  chainWebpack: config => {
    config.plugin("webpack-moment-lite").use(IgnorePlugin, [
      {
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }
    ]);
  },
  devServer: {
    before: configureServer
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/style/_breakpoints.scss";`
      }
    }
  }
};
