const mongoose = require("mongoose");
const amiryatSchema = new mongoose.Schema({
  Directorate: {
    type: String,
    // required: true,
  },
  Director: {
    type: String,
    // required: true,
  },

  DirectoratePashto: {
    type: String,
    // required: true,
  },
  UserType: {
    type: String,
    required: true,
  },
  DirectorateId: {
    type: String,
    // required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
});
const amiryat = new mongoose.model("amiryat", amiryatSchema);
module.exports = amiryat;
