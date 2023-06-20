const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const isthelaam = require("../models/istehlaam");

// CREATING NEW Istehlaam Documents
exports.newIstehlaam = (req, res, next) => {
  console.log("newIstehlaam is called");

  const { title, venue, date, time, organizers } = req.body;
  const isthelaam = new isthelaam({
    Title: title,
    Vanue: venue,
    Date: date,
    Time: time,
    Organizers: organizers,
  });
  //   // SAVEING NEW CAMPS TO DATABASE
  //   isthelaam
  //     .save()
  //     .then((result) => {
  //       res.status(201).json({ message: "New camp created", isthelaam: result });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};

// Getting Istehlaam List
exports.getIstehlaamsList = (req, res, next) => {
  const { istelaamNo } = req.body;
  console.log("getIstehlaamsList called", istelaamNo);

  //
  const isthelaam = new isthelaam({
    Title: title,
    Vanue: venue,
    Date: date,
    Time: time,
    Organizers: organizers,
  });
  //   // SAVEING NEW CAMPS TO DATABASE
  //   isthelaam
  //     .save()
  //     .then((result) => {
  //       res.status(201).json({ message: "New camp created", isthelaam: result });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};
