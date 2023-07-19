const express = require("express");
const maktobController = require("../controller/maktob");
const router = express.Router();
const multer = require("multer");
const path = require("path");
router.post("/new-maktob", maktobController.newMaktob);
router.post("/maktobs", maktobController.getmaktobLists);
router.post("/received-maktobs", maktobController.getReceivedMaktobLists);
router.post("/uniquemaktob", maktobController.getMaktobBaseOnId);
router.post("/maktob-no", maktobController.getmaktobNo);
router.post("/send-matkob", maktobController.sendMaktob);
router.post("/file-upload", maktobController.fileUpload);
router.delete("/delete", maktobController.deleteMaktob);
// router.put("/update", maktobController.updateMakob);


module.exports = router;
