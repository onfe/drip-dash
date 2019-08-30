const User = require("../models").User;
const bcrypt = require("bcrypt");

module.exports = {
  create(username, password) {
    // Generate the salt, and hash using bcrypt with 10 rounds.
    var passwordHash = bcrypt.hashSync(password, 10);
    return User.create({ username: username, passhash: passwordHash });
  },

  auth(username, password) {
    var u = User.findOne({ where: { username: username } }).then(user => {
      if (user) {
        // there is a user with this username, continue with auth.
        var passMatch = bcrypt.compareSync(password, user.passhash);
        if (passMatch) {
          return user;
        } else {
          // password incorrect.
          return null;
        }
      } else {
        // there isn't a user for this username.
        return null;
      }
    });
    return u;
  },

  exists() {
    var u = User.findAll({}).then(userList => {
      if (userList.length == 0) {
        return false;
      } else {
        return true;
      }
    });
    return u;
  },

  get(username) {
    var u = User.findOne({ where: { username: username } }).then(user => {
      if (user) {
        return user;
      } else {
        return false;
      }
    });
    return u;
  }
};
