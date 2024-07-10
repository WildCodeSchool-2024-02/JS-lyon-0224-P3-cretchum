const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const {
  read,
  add,
  received,
  edit,
} = require("../../../controllers/reservationActions");

const newNotification = require("../../../controllers/notificationAction");

const userIdCookie = require("../../../services/userIdCookie");

// Import reservation-related actions

router.get("/", userIdCookie, read);

router.get("/received", userIdCookie, received);

router.put("/status", userIdCookie, edit);

router.post("/", add, newNotification);

module.exports = router;
