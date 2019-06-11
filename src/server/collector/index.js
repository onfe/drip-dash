const { resolve } = require("path");
const express = require("express");
const app = express();

collector = require("./collector.js");

const { COLLECTOR_PORT = 8000 } = process.env;

app.use("/collect", collector);

// And let it begin!
app.listen(COLLECTOR_PORT, () => console.log(`Collector running on port ${COLLECTOR_PORT}!`));
