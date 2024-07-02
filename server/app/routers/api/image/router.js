const express = require("express");

const router = express.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const upload = require("../../../services/uploadImage");
// Import users-related actions
const {
  read,
  edit,

  destroy,
} = require("../../../controllers/imageActions");

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.put("/:id", upload.single("avatar"), edit);

// Route to edit an existing user
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
