const express = require('express');
const router = express.Router()

module.exports = router

router.post('/auth/request', function (req, res) {
  res.send('one')
});

router.post('/api/auth/request', function (req, res) {
  res.send('two')
});
