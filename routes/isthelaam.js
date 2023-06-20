const express = require("express");
const istehlaamController = require("../controller/istehlaam");
const router = express.Router();

router.post("/new-istehlaam", istehlaamController.newIstehlaam);
router.get("/istehlaams", istehlaamController.getIstehlaamsList);

module.exports = router;
