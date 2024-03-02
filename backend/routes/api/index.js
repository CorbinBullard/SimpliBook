const router = require("express").Router();

const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/services", require("./services"));
router.use("/session", require("./session"));
router.use("/users", require("./users"));
router.use("/slots", require("./slots"));
router.use("/bookings", require("./bookings"));
router.use("/external", require("./external"));

module.exports = router;
