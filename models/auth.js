const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});
const user = new mongoose.model("user", userSchema);
module.exports = user;
