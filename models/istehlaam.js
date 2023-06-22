const mongoose = require("mongoose");
const istehlaamSchema = new mongoose.Schema({
  IstehlaamNo: {
    type: String,
    required: true,
  },

  IstehlaamDate: {
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
});

const istehlaam = new mongoose.model("istehlaam", istehlaamSchema);
module.exports = istehlaam;
