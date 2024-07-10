const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const { read, edit } = require("../../../controllers/reservationActions");

// const userIdCookie = require("../../../services/userIdCookie");

// Import reservation-related actions

router.get("/", read);

router.put("/status", edit);

module.exports = router;
