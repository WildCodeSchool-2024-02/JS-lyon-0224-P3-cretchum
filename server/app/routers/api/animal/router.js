const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import animal-related actions
const {
  read,
  browse,
  add,
  destroy,
} = require("../../../controllers/animalActions");

const validateAnimals = require("../../../services/validateAnimals");
const deniedAccess = require("../../../services/deniedAccess");

// Route to get a list of animals
router.get("/", browse);

// Route to get a specific animal by ID
router.get("/:id", read);

// Route to add a new animal
router.post("/:id", validateAnimals, deniedAccess,  add);

// Route to edit an existing animal
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
