const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");
const HomeStructureRouter = require("./home_structure/router");
const animalRouter = require("./animal/router");
const authAction = require("./auth/router");

router.use("/users", usersRouter);
router.use("/homestructure", HomeStructureRouter);
router.use("/animal", animalRouter);
router.use("/auth", authAction);

/* ************************************************************************* */

module.exports = router;
