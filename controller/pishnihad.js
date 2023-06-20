const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const pishnihad = require("../models/pishnihad");

// CREATING NEW Istehlaam Documents
exports.newPishnihad = (req, res, next) => {
  console.log("NewPishnihad is called");

  // const { title, venue, date, time, organizers } = req.body;
  // const isthelaam = new isthelaam({
  //   Title: title,
  //   Vanue: venue,
  //   Date: date,
  //   Time: time,
  //   Organizers: organizers,
  // });
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
exports.getPishnihadlist = (req, res, next) => {
  const { pishnihadNo } = req.body;
  console.log("getIstehlaamsList called", pishnihadNo);

  //
  // const isthelaam = new isthelaam({
  //   Title: title,
  //   Vanue: venue,
  //   Date: date,
  //   Time: time,
  //   Organizers: organizers,
  // });
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
