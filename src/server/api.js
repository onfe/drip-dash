require("dotenv").config();

const express = require("express");
const router = express.Router();

const auth = require("./routes/auth");
const devices = require("./routes/devices");

module.exports = router;

router.use("/auth", auth);
router.use("/devices", devices);
