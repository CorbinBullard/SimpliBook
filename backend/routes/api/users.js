const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { requireAuth } = require("../../utils/auth");

/* GET users listing. */
router.get("/public", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { public_key } = await User.unscoped().findByPk(user.id);

  return res.json(public_key);
});

// Create a new user
router.post("/", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);
  const public_key = crypto.randomBytes(32).toString("hex");
  const user = await User.create({
    first_name,
    last_name,
    email,
    hashed_password,
    public_key,
  });
  return res.json(user);
});
module.exports = router;

// insert secret key hash
router.put("/secret", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { private_key } = req.body;
  if (!user) return res.json({ message: "No user found" });
  const hashed_private_key = bcrypt.hashSync(private_key, 10);
  const updatedUser = await user.update({ hashed_private_key });
  return res.json(updatedUser);
});
