const express = require("express");
const documentsJustificationController = require("../controller/document-justification");
const router = express.Router();

router.post("/maktob", documentsJustificationController.maktobJustification);
router.post(
  "/gettingJustification",
  documentsJustificationController.gettingMaktobJustification
);
module.exports = router;
