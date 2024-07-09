const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const { read, add } = require("../../../controllers/reservationActions");
// Import users-related actions

router.get("/", read);

router.post("/", add);

module.exports = router;
