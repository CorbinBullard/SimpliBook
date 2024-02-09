const express = require("express");
const { Booking, Slot } = require("../../db/models");
const router = express.Router();
const { bookingCheck } = require("../../utils/bookingCheck.js");

router.get("/", async (req, res, next) => {
  const bookings = await Booking.findAll();
  return res.json({ bookings });
});

router.post("/", async (req, res, next) => {
  const { date, slot_id } = req.body;
  const slot = await Slot.findByPk(slot_id);

  if (!bookingCheck(date, slot))
    return res.json({ message: "Invalid date or slot" });
  const conflictingBookings = await Booking.findAll({
    where: {
      slot_id,
      date,
    //   include: Slot,
    },
  });
  if (conflictingBookings.length) {
    return res.json({ message: "Slot already booked" });
  }

  const newBooking = {
    slot_id,
    date,
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
  await booking.destroy();
  return res.json({ message: "successfully deleted" });
});

module.exports = router;
