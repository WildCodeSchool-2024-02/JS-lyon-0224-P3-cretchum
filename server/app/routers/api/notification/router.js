const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const { read, destroy } = require("../../../controllers/notificationAction");

const userIdCookie = require("../../../services/userIdCookie");

// Import reservation-related actions

router.get("/", userIdCookie, read);

router.delete("/", destroy);

// router.put("/status", edit);

module.exports = router;
