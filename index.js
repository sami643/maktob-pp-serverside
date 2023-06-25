const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./db/connection");
app.use(bodyParser.json());
app.use(cors());
app.get(express.json());
console.log("Hello Backend services");

const maktobRoute = require("./routes/maktob");
const istehlaamRoute = require("./routes/isthelaam");
const pishnihadRoutes = require("./routes/pishnihad");
const loginRoute = require("./routes/auth");

// istehlaam middleware
app.use("/api/istehlaam", istehlaamRoute);

// maktob  middleware
app.use("/api/maktob", maktobRoute);

// pishnihad middleware
app.use("/api/pishnihad", pishnihadRoutes);

app.use("/api/user", loginRoute);

const PORT = process.env.PORT || 3006;
app.listen(PORT, console.log(`Server Started on port ${PORT}`));
