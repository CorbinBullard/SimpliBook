const router = require("express").Router();
const { User, Slot, Booking, ServiceType } = require("../../db/models");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const { Op, Sequelize } = require("sequelize");

const validateKeys = async (req, res, next) => {
  const public_key = req.get("public_key");
  const private_key = req.get("private_key");

  if (!public_key || !private_key) {
    return res.json({ message: "Invalid keys" });
  }
  const user = await User.unscoped().findOne({
    where: { public_key },
  });
  if (
    !user ||
    !bcrypt.compareSync(private_key, user.hashed_private_key.toString())
  ) {
    return res.json({ message: "Invalid keys" });
  }
  next();
};
router.use(validateKeys);

router.get("/slots/:date", async (req, res) => {
  try {
    const public_key = req.get("public_key");
    const { date } = req.params;

    const user = await User.findOne({ where: { public_key } });
    if (!user) return res.status(404).json({ message: "No user found" });

    const slots = await Slot.findAll({
      where: { user_id: user.toJSON().id, day: dayjs(date).format("d") },
      include: [
        {
          model: Booking,
          where: {
            date: { [Op.substring]: dayjs(date).format("YYYY-MM-DD") },
          },
          // attributes: [
          //   [Sequelize.fn("SUM", Sequelize.col("persons")), "persons"],
          // ],
          required: false,
        },
        {
          model: ServiceType,
          attributes: ["name", "capacity"],
        },
      ],
    });

    if (!slots || slots.length === 0) return res.status(404).json([]);

    const availableSlots = slots.map((slot) => {
      console.log(slot.toJSON());
      const slotJSON = slot.toJSON();
      const bookedPersons = slotJSON.Bookings.reduce(
        (acc, booking) => acc + booking.persons,
        0
      );
      const available = slotJSON?.ServiceType?.capacity - bookedPersons;
      return {
        service: slotJSON.ServiceType.name,
        available_seats: Math.max(0, available), // Ensure available seats don't go negative
        time: slotJSON.start_time,
      };
    });

    return res.json(availableSlots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/slots/:slot_id/bookings", async (req, res) => {
  try {
    const public_key = req.get("public_key");
    const { slot_id } = req.params;
    const { persons, date } = req.body;

    const user = await User.findOne({ where: { public_key } });
    if (!user) return res.status(404).json({ message: "No user found" });

    const slot = await Slot.findByPk(slot_id, {
      include: [
        {
          model: Booking,
          where: { date: { [Op.substring]: dayjs(date).format("YYYY-MM-DD") } },
          required: false,
        },
        {
          model: ServiceType,
          attributes: ["capacity"],
        }, 
      ],
    });
    console.log("SLOT : ", slot.toJSON());

    if (!slot) return res.status(404).json({ message: "No slot found" });

    const bookedPersons = slot.Bookings.reduce(
      (acc, booking) => acc + booking.persons,
      0
    );
    const available = slot?.ServiceType?.capacity - bookedPersons;
    if (available < persons)
      return res.status(400).json({ message: "Not enough available seats" });

    const booking = await Booking.create({
      slot_id,
      user_id: user.id,
      persons,
      date,
      ...req.body,
    });

    return res.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
