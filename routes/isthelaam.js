const express = require("express");
const istehlaamController = require("../controller/istehlaam");
const router = express.Router();

router.post("/new-istehlaam", istehlaamController.newIstehlaam);
router.post("/istehlaams", istehlaamController.getIstehlaamsList);

module.exports = router;
