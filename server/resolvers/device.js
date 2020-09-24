const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Device = {
  owner: async (device) => {
    return await prisma.device.findOne({ where: { id: device.id }}).owner();
  },
  location: (device) => {
    if (!device.longitude || !device.latitude) return null;
    return {
      latitude: device.latitude,
      longitude: device.longitude
    }
  },
  data: async (device) => {
    return await prisma.dataEntry.findMany({ where: { deviceId: device.id }})
  },
  latest: async (device) => {
    const latest = await prisma.dataEntry.findMany({
      where: { deviceId: device.id },
      orderBy: { timestamp: "desc" },
      take: 1
    })
    
    return latest.length === 1 ? latest[0] : null;
  }
}

module.exports = Device;