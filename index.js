const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("./db/connection");
app.use(bodyParser.json());
app.get(express.json());
console.log("Hello Backend services");

const maktobRoute = require("./routes/maktob");
const istehlaamRoute = require("./routes/isthelaam");
const pishnihadRoutes = require("./routes/pishnihad");

const maktobRoute_2 = require("./routes/maktob");
const istehlaamRoute_2 = require("./routes/isthelaam");
const pishnihadRoutes_2 = require("./routes/pishnihad");

const maktobRoute_3 = require("./routes/maktob");
const istehlaamRoute_3 = require("./routes/isthelaam");
const pishnihadRoutes_3 = require("./routes/pishnihad");

// istehlaam middleware
app.use("/api/istehlaam", istehlaamRoute);

// maktob  middleware
app.use("/api/maktob", maktobRoute);

// pishnihad middleware
app.use("/api/pishnihad", pishnihadRoutes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, console.log(`Server Started on port ${PORT}`));
