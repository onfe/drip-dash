const jwt = require("jsonwebtoken");
const privatekey = "894dfb33-e865-4c26-83db-8b16627a0fd7";

module.exports = {
  create(user) {
    return jwt.sign({ username: user.username }, privatekey, { expiresIn: "1h" });
  },

  check(token) {
    try {
      var payload = jwt.verify(token, privatekey);
      if (payload) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      console.log(err);
      return false;
    }
  }
};
