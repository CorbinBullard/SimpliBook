const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await User.unscoped().findAll();

  return res.json(users);
});

// Create a new user
router.post("/", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);
  const user = await User.create({
    first_name,
    last_name,
    email,
    hashed_password,
  });
  return res.json(user);
});
module.exports = router;
