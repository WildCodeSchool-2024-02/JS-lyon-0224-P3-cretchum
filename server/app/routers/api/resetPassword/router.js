const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const resetPassword = require("../../../controllers/resetPasswordActions");

// Import resetPassword actions
router.post("/", resetPassword);

/* ************************************************************************* */

module.exports = router;