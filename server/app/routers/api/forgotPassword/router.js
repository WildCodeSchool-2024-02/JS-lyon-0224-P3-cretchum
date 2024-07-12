const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import forgotPassword actions
const forgotPassword = require("../../../controllers/forgotPasswordActions");
// Import forgotPassword validate
const validateForgotPassword = require("../../../services/validateForgotPassword");

// Route read email
router.post("/", validateForgotPassword, forgotPassword);

/* ************************************************************************* */

module.exports = router;
