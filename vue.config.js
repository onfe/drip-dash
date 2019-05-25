const configureServer = require("./src/server/config/configure");

module.exports = {
  devServer: {
    before: configureServer
  }
};
