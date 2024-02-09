const express = require("express");
const { Slot } = require("../../db/models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const slots = await Slot.findAll();
  return res.json(slots);
});

module.exports = router;
