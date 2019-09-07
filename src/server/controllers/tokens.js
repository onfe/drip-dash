const jwt = require("jsonwebtoken");
const privatekey = require("crypto")
  .randomBytes(48)
  .toString("base64")
  .replace(/\//g, "_")
  .replace(/\+/g, "-");

module.exports = {
  create(user, expiresIn) {
    return jwt.sign({ username: user.username }, privatekey, {
      expiresIn: `${expiresIn}`,
      algorithm: "HS256"
    });
  },

  check(token) {
    try {
      var payload = jwt.verify(token, privatekey, {
        algorithms: ["HS256"]
      });
      if (payload) {
        return payload;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};
