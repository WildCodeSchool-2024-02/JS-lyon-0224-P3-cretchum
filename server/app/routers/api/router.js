const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const HomeStructureRouter = require("./home_structure/router");
const animalRouter = require("./animal/router");
const authAction = require("./auth/router");

router.use("/user", userRouter);
router.use("/homestructure", HomeStructureRouter);
router.use("/animal", animalRouter);
router.use("/auth", authAction);

/* ************************************************************************* */

module.exports = router;
