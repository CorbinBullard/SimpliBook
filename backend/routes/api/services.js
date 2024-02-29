const express = require("express");
const router = express.Router();
const { Slot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateTime } = require("../../utils/dateTimeValidators");

const { ServiceType } = require("../../db/models");

//Get all current User's service types
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;
  if (!user) return res.json({ message: "No user found" });
  const serviceTypes = await ServiceType.findAll({
    where: { user_id: user.toJSON().id },
    include: Slot,
  });
  return res.json(serviceTypes);
});

router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  if (!user) return res.json({ message: "No user found" });
  const { name, price, capacity, duration } = req.body;
  const serviceType = await ServiceType.create({
    name,
    price,
    capacity,
    duration,
    user_id: user.toJSON().id,
  });
  return res.json(serviceType);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  if (!user) return res.json({ message: "No user found" });
  const serviceType = await ServiceType.findByPk(req.params.id);
  if (!serviceType) return res.json({ message: "No service type found" });
  if (serviceType.toJSON().user_id !== user.toJSON().id)
    return res.json({ message: "Unauthorized" });

  const { name, price, capacity, duration } = req.body;
  const updatedServiceType = await serviceType.update({
    name,
    price,
    capacity,
    duration,
  });

  return res.json(updatedServiceType);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  if (!user) return res.json({ message: "No user found" });
  const serviceType = await ServiceType.findByPk(req.params.id);
  if (!serviceType) return res.json({ message: "No service type found" });
  if (serviceType.toJSON().user_id !== user.toJSON().id)
    return res.json({ message: "Unauthorized" });
  await serviceType.destroy();
  return res.json({ message: "Service type deleted" });
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

// Create a slot for a specific service type
router.post("/:id/slots", requireAuth, validateTime, async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { day, start_time, end_time } = req.body;

  if (!user) return res.json({ message: "No user found" });
  const slots = await Slot.findAll({
    where: {
      user_id: user.toJSON().id,
      day,
      service_type_id: id,
    },
  });


  const hasConflict = slots.some((slot) => {
    const existingStart = slot.start_time;
    const existingEnd = slot.end_time;
    // Check if the new slot starts or ends during an existing slot
    return start_time < existingEnd && end_time > existingStart;
  });

  // If there's a conflict, return an error message
  if (hasConflict) {
    return res.status(409).json({ message: "Time conflict" }); // 409 Conflict
  }

  const slot = await Slot.create({
    day,
    start_time,
    end_time,
    user_id: user.toJSON().id,
    service_type_id: id,
  });
  return res.json(slot);
});

module.exports = router;
