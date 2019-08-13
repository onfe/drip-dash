const jwt = require("jsonwebtoken");
const privatekey = "894dfb33-e865-4c26-83db-8b16627a0fd7";

module.exports = {
  create(user, expiresIn) {
    return jwt.sign({ username: user.username }, privatekey, { expiresIn: `${expiresIn}` });
  },

  check(token) {
    try {
      var payload = jwt.verify(token, privatekey);
      if (payload) {
        return payload;
      } else {
        return false;
      }
    } catch(err) {
      console.log(err);
      return false;
    }
  }
};
