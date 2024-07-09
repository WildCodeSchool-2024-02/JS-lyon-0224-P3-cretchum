const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const {
  read,
  add,
  received,
} = require("../../../controllers/reservationActions");
// Import users-related actions

router.get("/", read);

router.get("/received", received);

router.post("/", add);

module.exports = router;
