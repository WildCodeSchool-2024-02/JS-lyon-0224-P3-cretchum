const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/homestructureActions");

const validateHomeStructure = require("../../../services/validateHomeStructure");

const deniedAccess = require("../../../services/deniedAccess");

const checkHasAnimalsIsHomeStructure = require("../../../services/checkHasAnimalsIsHomeStructure");



// Route to get a list of home_structure
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to edit an existing user
router.put("/:id", edit);

// Route to add a new user
router.post("/:id", validateHomeStructure, deniedAccess, checkHasAnimalsIsHomeStructure, add);

// Route to edit an existing user
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
