const User = require('../models').User;
const bcrypt = require('bcrypt');

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
        var passMatch = bcrypt.compareSync( password, user.passhash );
        console.log(username +" " + password + " " + passMatch)
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

  createDefault() {
    User.findAll({}).then(userList => {
      console.log(userList.length)
      if (userList.length == 0) {
        this.create('test', 'test');
      }
    });
  }
}
