const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  PresidencyName: {
    type: String,
    required: true,
  },
  PresidentName: {
    type: String,
    // required: true,
  },
  Directorate: {
    type: String,
    // required: true,
  },
  Director: {
    type: String,
    // required: true,
  },

  PhoneNo: {
    type: String,
    required: true,
  },
  HigherAuthority: {
    type: String,
    // required: true,
  },
  Management: {
    type: String,
    // required: true,
  },
  Email: {
    type: String,
    // required: true,
  },
});
const user = new mongoose.model("user", userSchema);
module.exports = user;
