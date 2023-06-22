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
});

const maktob = new mongoose.model("maktob", maktobSchema);
module.exports = maktob;
