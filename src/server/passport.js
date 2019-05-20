const tokens = require('./controllers/tokens')

module.exports = options => {
  return function isAuthenticated(req, res, next) {
    // express middleware that checks if a request is authenticated, if not redirect or 401.

    // fetch the auth token, if present.
    var token = req.get("Authorization");

    // verify the auth token (not expired and signed by us)
    if (token && tokens.check(token)) {
      // great, it all checks out. Pass control on.
      return next();
    }

    // Access not granted, so we either redirect or 401.
    if (options && options.redirect) {
      res.redirect(options.redirect)
    } else {
      res.status(401).send("Route requires valid authentication token.")
    }
  }
}
