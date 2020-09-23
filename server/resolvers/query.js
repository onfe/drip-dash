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
  },
  unregisteredDevices: async () => {
    const thirtyminsago = new Date(Date.now() - (1000 * 60 * 30))
    const devices = await prisma.unregisteredDevice.findMany({
      where: {
        online: {
          gte: thirtyminsago
        }
      }
    })

    prisma.unregisteredDevice.deleteMany({
      where: {
        online: {
          lt: thirtyminsago
        }
      }
    })

    return devices;
  }
}

module.exports = Query;