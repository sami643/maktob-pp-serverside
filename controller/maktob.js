const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const maktobs = require("../models/maktob");

// CREATING NEW Istehlaam Documents
exports.newMaktob = (req, res, next) => {
  console.log("New Maktob is called");
  const { maktobNo, maktobDate, recipent, subject, context, userId } = req.body;
  const maktob = new maktobs({
    MaktobNo: maktobNo,
    MaktobDate: maktobDate,
    Recipent: recipent,
    Subject: subject,
    Context: context,
    UserID: userId,
  });

  maktob
    .save()
    .then((result) => {
      res.status(201).json({ message: "New Maktob created", Maktob: result });
    })
    .catch((err) => {
      console.log(err, "Following Error Occured");
    });
};

// Getting Istehlaam List
exports.getmaktobLists = (req, res, next) => {
  // const { maktobNo } = req.body;

  maktobs.find().then((result) => {
    res.status(201).json({ message: "Data of the Maktobs", Maktobs: result });
  });
};
