const express = require("express");
const { Slot, ServiceType, Booking } = require("../../db/models");
const { validateTime } = require("../../utils/dateTimeValidators");
const { requireAuth } = require("../../utils/auth");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const { bookingCheck } = require("../../utils/bookingCheck");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   const slots = await Slot.findAll({ where: { day: req.query.date } });
//   return res.json(slots);
// });

//Get all current User's slots
router.get("/", async (req, res, next) => {
  const { user } = req;
  const { date } = req.query;
  const { bookings } = req.query;

  if (!user) return res.json({ message: "No user found" });

  const where = {
    user_id: user.toJSON().id,
  };
  if (date) {
    where.day = dayjs(date).format("d");
  }
  const slots = await Slot.findAll({
    where,
    include: [
      {
        model: Booking,
        where: {
          date: { [Op.substring]: dayjs(date).format("YYYY-MM-DD") },
        },
        required: bookings ? true : false, // This makes the inclusion of bookings optional, thus including slots even if there are no bookings for the given date
      },
      { model: ServiceType, attributes: ["name"] },
    ],
  });
  return res.json(slots);
});

router.get("/:id/bookings", async (req, res, next) => {
  const { date } = req.query;
  const { id } = req.params;
  const slot = await Slot.findByPk(id);
  if (!slot) return res.json({ message: "Slot not found" });
  const bookings = await slot.getBookings({
    where: { date: { [Op.substring]: dayjs(date).format("YYYY-MM-DD") } },
  });
  return res.json(bookings);
});

// Create Booking from Slot
router.post("/:id/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const slot = await Slot.findByPk(id, {
    include: [{ model: ServiceType }],
  });
  if (!slot) return res.json({ message: "Slot not found" });
  const capacity = slot.ServiceType.capacity;
  const { date, persons } = req.body;
  if (!bookingCheck(date, slot.toJSON()))
    return res.json({ message: "Invalid date or slot" });
  const conflictingBookings = await Booking.findAll({
    where: {
      slot_id: id,
      date,
    },
  });
  if (conflictingBookings.length) {
    bookingsJSON = conflictingBookings.map((booking) => booking.toJSON());
    const currentCapacity = bookingsJSON.reduce(
      (acc, curr) => (acc += curr.persons),
      0
    );
    if (currentCapacity + persons > capacity)
      return res.json({ message: "Not enough space" });
  }
  const newBooking = {
    user_id: user.toJSON().id,
    slot_id: id,
    ...req.body,
    recurring: false,
  };
  const booking = await Booking.create(newBooking);
  return res.json(booking);
});

router.delete("/:id", requireAuth, async (req, res, next) => {
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
