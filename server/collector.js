const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

router.all("/:id/", async function(req, res) {
  if (!(req.params.id && req.params.id.length > 2)) return;

  const device = await prisma.device.findOne({
    where: { id: req.params.id }
  });

  if (device) {
    // todo
  } else {
    // unregistered device
    await prisma.unregisteredDevice.upsert({
      where: { id: req.params.id },
      create: {
        id: req.params.id,
        online: new Date()
      },
      update: {
        id: req.params.id,
        online: new Date()
      }
    })
  }

  res.send("OK");
});


module.exports = router;

