const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signUp);
router.post(
  "/receivedMaktob-userData",
  AuthController.gettigReceivedMaktobUserData
);

module.exports = router;
