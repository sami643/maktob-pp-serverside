const express = require("express");
const pishnihadController = require("../controller/pishnihad");
const router = express.Router();

router.post("/new-pishnihad", pishnihadController.newPishnihad);
router.post("/pishnihads", pishnihadController.getPishnihadlist);
router.post("/uniquePishnihad", pishnihadController.gettingSpecificPishnihad);
router.delete("/delete", pishnihadController.deletePishnihad);
// router.put("/update", pishnihadController.updatePishnihaad);
module.exports = router;
