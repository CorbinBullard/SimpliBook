const router = require("express").Router();

const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/service", require("./service"));
router.use("/session", require("./session"));
router.use("/users", require("./users"));
router.use("/slots", require("./slots"));
router.use("/bookings", require("./bookings"));

module.exports = router;
