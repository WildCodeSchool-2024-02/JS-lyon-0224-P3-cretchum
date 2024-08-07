const express = require("express");
const path = require("path");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const HomeStructureRouter = require("./home_structure/router");
const animalRouter = require("./animal/router");
const imageRouter = require("./image/router");
const authAction = require("./auth/router");
const reservationRouter = require("./reservation/router");
const notificationRouter = require("./notification/router");
const forgotPasswordRouter = require("./forgotPassword/router");
const resetPasswordRouter = require("./resetPassword/router");

router.use(
  "/avatars",
  express.static(path.join(__dirname, "../../../public/assets/avatars"))
);
router.use("/user", userRouter);
router.use("/homestructure", HomeStructureRouter);
router.use("/animal", animalRouter);
router.use("/image", imageRouter);
router.use("/auth", authAction);
router.use("/reservation", reservationRouter);
router.use("/notification", notificationRouter);
router.use("/forgot-password", forgotPasswordRouter);
router.use("/reset", resetPasswordRouter);

/* ************************************************************************* */

module.exports = router;
