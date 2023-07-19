const mongoose = require("mongoose");
const maktobSchema = new mongoose.Schema({
  MaktobNo: {
    type: String,
    required: true,
  },

  MaktobDate: {
    type: String,
    required: true,
  },

  Recipent: {
    type: String,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },

  Context: {
    type: String,
    required: true,
  },
  UserID: {
    type: String,
    required: true,
  },
  PresidencyName: {
    type: String,
    required: true,
  },
  MaktobType: {
    type: String,
    required: true,
  },
  CopyTo: {
    type: Array,
  },
  UserStatus: {
    type: String,
  },
  AttachedDocuments: {
    type: Array,
  },
  MaktobSent: {
    type: Boolean,
  },
  AllReceivers: { type: Array },
});

const maktob = new mongoose.model("maktob", maktobSchema);
module.exports = maktob;
