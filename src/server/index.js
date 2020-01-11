/*
 * DripDash Production Server
 */

require("dotenv").config();

const { resolve } = require("path");
const history = require("connect-history-api-fallback");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const api = require("./api");
const collector = require("./collector/collector");

const { PORT = 8000, COLLECTOR = 'internal' } = process.env;

// Express configuration
app.use(bodyParser.json());

// Vue UI History Mode
const publicPath = resolve(__dirname, "../../dist");
const staticConf = { maxAge: "1y", etag: false };

app.use(history());
app.use(express.static(publicPath, staticConf));

// API
app.use("/api", api);

// Collector
if (COLLECTOR == 'internal') {
  app.use("/collect", collector);
}

// Go
app.listen(PORT, () => console.log(`DripDash running on port ${PORT}!`));
