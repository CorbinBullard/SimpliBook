const express = require("express");
const { Slot } = require("../../db/models");
const { validateTime } = require("../../utils/dateTimeValidators");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const slots = await Slot.findAll();
  return res.json(slots);
});

router.get("/current", async (req, res, next) => {
  const { user } = req;

  if (!user) return res.json({ message: "No user found" });

  const slots = await Slot.findAll({ where: { user_id: user.toJSON().id } });
  return res.json(slots);
});


router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const slot = await Slot.findByPk(id);
  if (!slot) return res.json({ message: "Slot not found" });
  if (slot.toJSON().user_id !== user.toJSON().id)
    return res.json({ message: "Unauthorized" });
  await slot.destroy();
  return res.json({ message: "Slot deleted" });
});
module.exports = router;
