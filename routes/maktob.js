const express = require("express");
const maktobController = require("../controller/maktob");

const router = express.Router();

router.post("/new-maktob", maktobController.newMaktob);
router.post("/maktobs", maktobController.getmaktobLists);
router.delete("/delete", maktobController.deletingMaktob);

module.exports = router;
