const express = require("express");
const { Booking, Slot } = require("../../db/models");
const router = express.Router();
const { bookingCheck } = require("../../utils/bookingCheck.js");
const { ServiceType } = require("../../db/models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  const { user } = req;
  if (!user) return res.json({ message: "No user found" });
  const bookings = await Booking.findAll({
    where: { user_id: user.toJSON().id },
  });

  return res.json({ bookings });
});

router.post("/", async (req, res, next) => {
  //TODO: make sure that the users key is checked
  const { user } = req;
  const { date, slot_id } = req.body;
  if (!user) return res.json({ message: "No user found" });

  const slot = await Slot.findByPk(slot_id, {
    include: [{ model: ServiceType }],
  });
  const capacity = slot.ServiceType.capacity;

  if (!bookingCheck(date, slot))
    return res.json({ message: "Invalid date or slot" });
  // check if the slot is already booked
  const conflictingBookings = await Booking.findAll({
    where: {
      slot_id,
      date,
    },
  });

  if (conflictingBookings.length) {
    bookingsJSON = conflictingBookings.map((booking) => booking.toJSON());
    const currentCapacity = bookingsJSON.reduce(
      (acc, curr) => (acc += curr.persons),
      0
    );
    if (currentCapacity + req.body.persons > capacity)
      return res.json({ message: "Not enough space" });
  }

  const newBooking = {
    user_id: user.toJSON().id,
    slot: slot_id,
    date,
    ...req.body,
    // FAKE NAME
    name: "John Doe",
    // FAKE NUMBER
    number: "123-456-7890",
    // FAKE EMAIL
    email: "faker@email.com",
  };

  const booking = await Booking.create({ ...newBooking });
  return res.json({ booking });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findByPk(id);
  if (!booking) return res.json({ message: "Booking not found" });
  await booking.destroy();
  return res.json({ message: "successfully deleted" });
});

router.get("/:date/date", async (req, res, next) => {
  const { user } = req;
  if (!user) return res.json({ message: "No user found" });
  const { date } = req.params;
  const bookings = await Booking.findAll({
    where: { user_id: user.toJSON().id, date: { [Op.substring]: date } },
    include: [{ model: Slot, include: [{ model: ServiceType }] }],
  });
  return res.json(bookings);
});

module.exports = router;
