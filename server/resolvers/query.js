const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Query = {
  self: async (_, {}, ctx) => {
    if (!ctx.user) return null;
    const a =  await prisma.user.findOne({
      where: {
        id: ctx.user.id
      }
    });
    return a;
  }
}

module.exports = Query;