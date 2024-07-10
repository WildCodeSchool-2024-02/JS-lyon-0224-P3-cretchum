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

const userIdCookie = require("../../../services/userIdCookie");

// Import reservation-related actions

router.get("/", userIdCookie, read);

router.get("/received", userIdCookie, received);

router.put("/status", userIdCookie, edit);

router.post("/", add);

module.exports = router;
