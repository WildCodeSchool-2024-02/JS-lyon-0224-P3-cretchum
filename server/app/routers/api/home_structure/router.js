const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  readall,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/homestructureActions");

const validateHomeStructure = require("../../../services/validateHomeStructure");

const deniedAccess = require("../../../services/deniedAccess");

const uniqueEmailandUsername = require("../../../services/uniqueEmailAndUsername");

const updateUserHomeStructure = require("../../../services/updateUserHomeStructure");

const checkIsHomeStructure = require("../../../services/checkIsHomeStructure");


// Route to get a list of home_structure
router.get("/", browse);

// Route to get a specific user and home_structure by ID
router.get("/single/:id", read);

// Route to get a specific home_structure by ID
router.get("/:id", readall);

// Route to edit an existing home_structure
router.put("/:id", uniqueEmailandUsername, updateUserHomeStructure, edit);

// Route to add a new home_structure
router.post("/:id", validateHomeStructure, deniedAccess, checkIsHomeStructure, add);

// Route to edit an existing home_structure
router.delete("/:id", deniedAccess, destroy);

/* ************************************************************************* */

module.exports = router;
