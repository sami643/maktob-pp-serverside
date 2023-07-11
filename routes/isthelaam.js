const express = require("express");
const istehlaamController = require("../controller/istehlaam");
const router = express.Router();

router.post("/new-istehlaam", istehlaamController.newIstehlaam);
router.post("/istehlaams", istehlaamController.getIstehlaamsList);
router.post("/uniqueIstehlaam", istehlaamController.getIstehlaamBasedOnId);
router.delete("/delete", istehlaamController.deleteIstehlaam);
// router.put("/update", istehlaamController.updateIstehlaam);
module.exports = router;
