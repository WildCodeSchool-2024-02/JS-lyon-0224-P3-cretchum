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
const forgotPassword = require('../../controllers/forgotPassword');
const resetPassword = require('../../controllers/resetPassword');

router.use(
  "/avatars",
  express.static(path.join(__dirname, "../../../public/assets/avatars"))
);
router.use("/user", userRouter);
router.use("/homestructure", HomeStructureRouter);
router.use("/animal", animalRouter);
router.use("/image", imageRouter);
router.use("/auth", authAction);
router.post("/forgot-password", forgotPassword);
router.post('/reset/:token', resetPassword);


/* ************************************************************************* */

module.exports = router;
