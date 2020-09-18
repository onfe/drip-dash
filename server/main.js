/*
 * DripDash Production Server
 */

// require("dotenv").config();

const { resolve } = require("path");
const history = require("connect-history-api-fallback");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const api = require("./api");
// const collector = require("./collector");

const { PORT = 8000 } = process.env;

// Express configuration
app.use(bodyParser.json());

// API with Apollo Server
api.applyMiddleware({ app, path: "/api" });

// Vue UI History Mode
const publicPath = resolve(__dirname, "../dist");
const staticConf = { maxAge: "1y", etag: false };

app.use(history());
app.use(express.static(publicPath, staticConf));

// Collector
// app.use("/collect", collector);

// Go
app.listen(PORT, () => console.log(`🚀 DripDash server running at http://localhost:${PORT}`));