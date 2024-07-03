const express = require("express");

const router = express.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const upload = require("../../../services/uploadImage");
// Import users-related actions
const { editPicture } = require("../../../controllers/usersActions");

// Route to get a specific user by ID

// Route to add a new user
router.put("/:id", upload.single("avatar"), editPicture);

// Route to edit an existing user

/* ************************************************************************* */

module.exports = router;
