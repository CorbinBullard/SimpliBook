const express = require("express");
const { Booking, Slot } = require("../../db/models");
const router = express.Router();
const { bookingCheck } = require("../../utils/bookingCheck.js");
const { ServiceType } = require("../../db/models");

router.get("/", async (req, res, next) => {
  const bookings = await Booking.findAll();
  return res.json({ bookings });
});

router.post("/", async (req, res, next) => {
  //TODO: make sure that the users key is checked

  const { date, slot_id } = req.body;
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
    console.log(bookingsJSON);
    const currentCapacity = bookingsJSON.reduce(
      (acc, curr) => (acc += curr.persons),
      0
    );
    if (currentCapacity + req.body.persons > capacity)
      return res.json({ message: "Not enough space" });
  }

  const newBooking = {
    slot_id,
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

module.exports = router;
