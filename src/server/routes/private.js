const express = require('express');
const router = express.Router()
const passport = require('../passport')

module.exports = router
// we use the passport to secure routes to authenticated users only.
router.get('/test', passport({redirect: '/'}), function (req, res) {
  res.send("Secret Stuff!")
})
