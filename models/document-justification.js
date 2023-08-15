const mongoose = require("mongoose");
const documentsJustificationSchema = new mongoose.Schema({
  MolahizaTitle: {
    type: String,
    required: true,
  },
  MolahizaContext: {
    type: String,
    required: true,
  },
  MaktobNo: {
    type: String,
    required: true,
  },
  MaktobSenderPresidency: {
    type: String,
    required: true,
  },
  MaktobReceiverPresidency: {
    type: String,
    required: true,
  },
  Directorate: {
    type: String,
    required: true,
  },
  MolahizaDate: {
    type: String,
    required: true,
  },
});

const documentsJustification = new mongoose.model(
  "documentsJustification",
  documentsJustificationSchema
);
module.exports = documentsJustification;
