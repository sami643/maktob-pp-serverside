const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const maktob = require("../models/maktob");

// CREATING NEW Istehlaam Documents
exports.newMaktob = (req, res, next) => {
  console.log("New Maktob is called");

//   const { title, venue, date, time, organizers } = req.body;
//   const maktob = new maktob({
//     // Title: title,
//     // Vanue: venue,
//     // Date: date,
//     // Time: time,
//     // Organizers: organizers,
//   });
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
exports.getmaktobLists = (req, res, next) => {
  const { maktobNo } = req.body;
  console.log("gettingMaktob is Called ", maktobNo);

  //
//   const isthelaam = new isthelaam({
//     Title: title,
//     Vanue: venue,
//     Date: date,
//     Time: time,
//     Organizers: organizers,
//   });
};
