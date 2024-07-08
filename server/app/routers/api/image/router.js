const express = require("express");

const router = express.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const upload = require("../../../services/uploadImage");
// Import users-related actions
const {
  editPicture,
  readPicture,
} = require("../../../controllers/usersActions");

const deniedAccess = require("../../../services/deniedAccess");

// Route to get a specific user by ID
router.get("/:id", readPicture);
// Route to add a new user
router.put("/:id", deniedAccess, upload.single("avatar"), editPicture);

// Route to edit an existing user

/* ************************************************************************* */

module.exports = router;
