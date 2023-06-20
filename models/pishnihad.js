const mongoose = require("mongoose");
const pishnihadSchema = new mongoose.Schema({
  PishnihadNo: {
    type: String,
    required: true,
  },

  Date: {
    type: Date,
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

const Pishnihad = new mongoose.model("pishnihad", pishnihadSchema);
module.exports = Pishnihad;
