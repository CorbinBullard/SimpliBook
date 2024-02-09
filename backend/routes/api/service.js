const express = require("express");
const router = express.Router();
const { Slot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateTime } = require("../../utils/dateTimeValidators");

const { ServiceType } = require("../../db/models");

router.get("/", async (req, res) => {
  const serviceTypes = await ServiceType.findAll();
  return res.json(serviceTypes);
});

// SLOTS
//Get slots for a specific service type
router.get("/:id/slots", requireAuth, async (req, res, next) => {
  const service = await ServiceType.findByPk(req.params.id);
  if (!service) return res.json({ message: "No service type found" });
  const slots = await Slot.findAll({
    where: { service_type_id: service.toJSON().id },
  });
  return res.json(slots);
});
router.post("/:id/slots", requireAuth, validateTime, async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { day, start_time, end_time, service_type_id } = req.body;

  if (!user) return res.json({ message: "No user found" });
  const slots = await Slot.findAll({
    where: {
      user_id: user.toJSON().id,
      day,
      service_type_id,
    },
  });
  for (const slot of slots) {
    if (
      (start_time >= slot.toJSON().start_time &&
        start_time <= slot.toJSON().end_time) ||
      (end_time >= slot.toJSON().start_time &&
        end_time <= slot.toJSON().end_time)
    )
      return res.json({ message: "Time conflict" });
  }

  const slot = await Slot.create({
    day,
    start_time,
    end_time,
    user_id: user.toJSON().id,
    service_type_id,
  });
  return res.json(slot);
});

module.exports = router;
