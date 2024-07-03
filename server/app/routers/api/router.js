const express = require("express");
const path = require("path");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

router.use(
  "/uploads",
  express.static(path.join(__dirname, "../../../uploads"))
);
const usersRouter = require("./users/router");
const HomeStructureRouter = require("./home_structure/router");
const animalRouter = require("./animal/router");
const imageRouter = require("./image/router");
const authAction = require("./auth/router");

router.use("/users", usersRouter);
router.use("/homestructure", HomeStructureRouter);
router.use("/animal", animalRouter);
router.use("/image", imageRouter);
router.use("/auth", authAction);

/* ************************************************************************* */

module.exports = router;
