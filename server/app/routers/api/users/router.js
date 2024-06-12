const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import users-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/usersActions");

const validateSignIn = require("../../../services/validateSignIn");

// Route to get a list of categories
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to edit an existing user
router.put("/:id", validateSignIn, edit);

// Route to add a new user
router.post("/", validateSignIn, add);

// Route to edit an existing user
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
