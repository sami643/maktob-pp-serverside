const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const pishnihads = require("../models/pishnihad");

// CREATING NEW Istehlaam Documents
exports.newPishnihad = (req, res, next) => {
  console.log("NewPishnihad is called");
  const { pishnihadNo, pishnihadDate, recipent, subject, context, userId } =
    req.body;
  const pishnihad = new pishnihads({
    PishnihadNo: pishnihadNo,
    PishnihadDate: pishnihadDate,
    Recipent: recipent,
    Subject: subject,
    Context: context,
    UserID: userId,
  });

  pishnihad
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "New pishnihad created", pishnihads: result });
    })
    .catch((err) => {
      console.log(err, "Following Error Occured");
    });
};

// Getting Istehlaam List
exports.getPishnihadlist = (req, res, next) => {
  const { pishnihadNo } = req.body;

  pishnihads.find().then((result) => {
    res
      .status(201)
      .json({ message: "Data of the pishnihads", pishnihads: result });
  });
};
