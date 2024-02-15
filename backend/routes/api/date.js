const express = require("express");
const router = express.Router();
const { Slot, User, ServiceType, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");


