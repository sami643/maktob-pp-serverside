const express = require("express");
const pishnihadController = require("../controller/pishnihad");

const router = express.Router();

router.post("/new-pishnihad", pishnihadController.newPishnihad);
router.get("/pishnihads", pishnihadController.getPishnihadlist);

module.exports = router;
