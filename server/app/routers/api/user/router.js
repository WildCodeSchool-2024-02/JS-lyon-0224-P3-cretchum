const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  read,
  edit,
  add,
  destroy,
  checkLog,
  disconect,
} = require("../../../controllers/userActions");

const validateLogin = require("../../../services/validateLogin");

const deniedAccess = require("../../../services/deniedAccess");

const {
  validateSignup,
  validateProfileEdit,
} = require("../../../services/validateUser");
const uniqueEmailandUsername = require("../../../services/uniqueEmailAndUsername");

// Route to get a specific user by ID
router.get("/:id", deniedAccess, read);

// Route to edit an existing user

router.put("/:id", validateProfileEdit, uniqueEmailandUsername, edit);

// Route to add a new user
router.post("/", validateSignup, uniqueEmailandUsername, add);

// Route to check the login
router.post("/login", validateLogin, checkLog);

// Route to logout
router.post("/logout", disconect);

// Route to delete an existing user
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
