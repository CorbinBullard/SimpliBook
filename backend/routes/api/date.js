const express = require("express");
const router = express.Router();
const { Slot, User, ServiceType, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

router.get("/", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { date } = req.query;

  if (!user) return res.json({ message: "No user found" });

  const bookings = await Booking.findAll({
    where: { user_id: user.toJSON().id, date },
  });
  console.log(bookings.toJSON());

  return res.json(slots);
});
