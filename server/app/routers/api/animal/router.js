const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import users-related actions
const {
  read,
  browse,
  add,
  destroy,
} = require("../../../controllers/animalActions");

const validateAnimals = require("../../../services/validateAnimals");
const deniedAccess = require("../../../services/deniedAccess");

// Route to get a list of categories
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.post("/:id", validateAnimals, deniedAccess,  add);

// Route to edit an existing user
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
