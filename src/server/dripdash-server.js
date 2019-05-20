const express = require('express');
const router = express.Router()

const auth = require("./routes/auth");
const private = require("./routes/private")


module.exports = router

router.use('/auth', auth)
router.use('/private', private)
