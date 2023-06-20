const express = require("express");
const maktobController = require("../controller/maktob");

const router = express.Router();

router.post("/new-maktob", maktobController.newMaktob);
router.get("/maktobs", maktobController.getmaktobLists);

module.exports = router;
