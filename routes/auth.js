const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/adduser", AuthController.addUser);
router.post(
  "/receivedMaktob-userData",
  AuthController.gettigReceivedMaktobUserData
);
router.post("/amiryatdata", AuthController.amiryatData);

module.exports = router;
