const express = require("express");
const path = require("path");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");
const HomeStructureRouter = require("./home_structure/router");
const animalRouter = require("./animal/router");
const imageRouter = require("./image/router");
const authAction = require("./auth/router");
const reservationRouter = require("./reservation/router");

router.use(
  "/avatars",
  express.static(path.join(__dirname, "../../../public/assets/avatars"))
);
router.use("/users", usersRouter);
router.use("/homestructure", HomeStructureRouter);
router.use("/animal", animalRouter);
router.use("/image", imageRouter);
router.use("/auth", authAction);
router.use("/reservation", reservationRouter);

/* ************************************************************************* */

module.exports = router;
