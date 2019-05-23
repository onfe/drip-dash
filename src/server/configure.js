const bodyParser = require("body-parser");
const api = require("./dripdash-server.js");

module.exports = app => {
  app.use(bodyParser.json());
  app.use("/api", api);
};
