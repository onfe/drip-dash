/*
 * DripDash Development Server Extension for Webpack
 */

require("dotenv").config();

const bodyParser = require("body-parser");
const api = require("./api.js")
const collector = require("./collector/collector");;

const { COLLECTOR = 'internal' } = process.env;

module.exports = app => {
  app.use(bodyParser.json());
  app.use("/api", api);
  if (COLLECTOR == 'internal') {
    app.use("/collect", collector);
  }
};
