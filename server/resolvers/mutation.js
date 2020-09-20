const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const tokens = require("../tokens");

const Mutation = {
  register: async (_, {username, password}) => {
    const passHash = await bcrypt.hash(password, 11);
    const result = await prisma.user.create({
      data: {
        username,
        passHash
      }
    });

    return !!result;
  },

  login: async (_, {username, password}) => {
    console.log(username);
    const user = await prisma.user.findOne({
      where: {
        username
      }
    });

    // if the user exists and the password matches, create an auth token.
    if (user && await bcrypt.compare(password, user.passHash)) {
      return tokens.create(user, 3600);
    } else {
      return null;
    }
  }
}

module.exports = Mutation;