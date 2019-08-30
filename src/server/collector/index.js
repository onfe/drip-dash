const express = require("express");
const app = express();

const collector = require("./collector.js");
const bodyParser = require("body-parser");

const { COLLECTOR_PORT = 8363 } = process.env;

app.use(bodyParser.json());
app.use("/collect", collector);

// And let it begin!
app.listen(COLLECTOR_PORT, () =>
  console.log(`Collector running on port ${COLLECTOR_PORT}!`)
);
