const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/:id/", function( req, res ) {
  console.log(req);
  res.send("OK");
});

router.post("/", function( req, res ) {
  console.log(req);
  res.send("OK");
});
