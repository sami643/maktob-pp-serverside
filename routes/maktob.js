const express = require("express");
const maktobController = require("../controller/maktob");
const router = express.Router();

router.post("/new-maktob", maktobController.newMaktob);
router.post("/maktobs", maktobController.getmaktobLists);
router.post("/received-maktobs", maktobController.getReceivedMaktobLists);
router.post("/uniquemaktob", maktobController.getMaktobBaseOnId);
router.post("/maktob-no", maktobController.getmaktobNo);
router.delete("/delete", maktobController.deleteMaktob);
// router.put("/update", maktobController.updateMakob);
module.exports = router;
