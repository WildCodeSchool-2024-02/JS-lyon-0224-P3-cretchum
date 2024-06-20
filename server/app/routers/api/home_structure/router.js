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
} = require("../../../controllers/home_structureActions");

// Route to get a list of categories
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to edit an existing user
router.put("/:id", edit);

// Route to add a new user
router.post("/", add);

// Route to edit an existing user
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
