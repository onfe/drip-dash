const express = require("express");
const router = express.Router();

const auth = require("./routes/auth");
const priv = require("./routes/private");
const devices = require("./routes/devices");

// load configuration from .env file.
const env = require("dotenv").config();
if (env.error) {
  console.log("Something's wrong with your config.env.");
  throw env.error;
}

module.exports = router;

router.use("/auth", auth);
router.use("/private", priv);
router.use("/devices", devices);
