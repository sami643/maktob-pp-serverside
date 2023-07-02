const mongoose = require("mongoose");
const istehlaamSchema = new mongoose.Schema({
  IstehlaamNo: {
    type: String,
    required: true,
    // Unique is mongoose uathenthication that will presvent the duplicate maktob number of Istehlaam.
    // unique: true,
    //  it will change to lowercase before we store them in the database
    // lowercase: true,
    //it will hit error if the input is less than 6 characters.
    // minLength: 6,
  },

  IstehlaamDate: {
    type: String,
    required: true,
  },

  Recipent: {
    type: String,
    required: [true, "Please Enter your Reciptent"],
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
});
const istehlaam = new mongoose.model("istehlaam", istehlaamSchema);
module.exports = istehlaam;
