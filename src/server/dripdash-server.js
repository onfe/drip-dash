const express = require("express");
const router = express.Router();

const auth = require("./routes/auth");
const priv = require("./routes/private");

module.exports = router;

router.use("/auth", auth);
router.use("/private", priv);
