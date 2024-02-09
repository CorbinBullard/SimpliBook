const express = require("express");
const router = express.Router();
const { User } = require("../../db/models");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await User.findAll();
  return res.json(users);
});

module.exports = router;
