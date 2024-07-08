const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const { authActions } = require("../../../controllers/authactions");

router.get("/", authActions);

router.put("/:id", authActions);

router.post("/", authActions);

/* ************************************************************************* */

module.exports = router;
