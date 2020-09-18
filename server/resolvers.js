const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const tokens = require("./tokens");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    self: async (_, {}, ctx) => {
      if (!ctx.user) return null;
      const a =  await prisma.user.findOne({
        where: {
          id: ctx.user.id
        }
      });
      return a;
    }
  },
  Mutation: {
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
  },
  User: {
    location: (user) => {
      return {
        latitude: user.latitude,
        longitude: user.longitude
      }
    },
    devices: async (user) => {
      return await prisma.device.findMany({
        where: {
          owner: user
        }
      })
    },
    groups: async (user) => {
      return await prisma.group.findMany({
        where: {
          members: {
            some: {
              id: user.id
            }
          }
        }
      })
    }
  }
}


module.exports = resolvers;