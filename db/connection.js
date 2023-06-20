const mongoose = require("mongoose");

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/maktobApp")
  .then(() => console.log("The database is connected Successfully"))
  .catch((err) => console.error("Failed to connect the databse", err));
