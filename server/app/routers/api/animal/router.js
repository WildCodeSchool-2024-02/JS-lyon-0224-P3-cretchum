const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import animal-related actions
const {
  read,
  add,
  destroy,
  readAnimalId,
} = require("../../../controllers/animalActions");

const validateAnimals = require("../../../services/validateAnimals");
const deniedAccess = require("../../../services/deniedAccess");

// Route to get a specific animal by user ID
router.get("/:id", read);

// Route to get a specific animal by animal ID
router.get("/animalid/:id", readAnimalId);

// Route to add a new animal
router.post("/:id", validateAnimals, deniedAccess, add);

// Route to edit an existing animal
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
