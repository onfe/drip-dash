const { resolve } = require("path");
const history = require("connect-history-api-fallback");
const express = require("express");
const configureAPI = require("./config/configure");
const app = express();

const { PORT = 8000 } = process.env;

// API
configureAPI(app);

// UI
const publicPath = resolve(__dirname, "../../dist");
const staticConf = { maxAge: "1y", etag: false };

app.use(express.static(publicPath, staticConf));
app.use("/", history());

// Go
app.listen(PORT, () => console.log(`DripDash running on port ${PORT}!`));
