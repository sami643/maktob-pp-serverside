const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");

// const jwt = require("jsonwebtoken");
const pishnihads = require("../models/pishnihad");

// CREATING NEW Istehlaam Documents
exports.newPishnihad = (req, res, next) => {
  const { pishnihadNo, pishnihadDate, recipent, subject, context, userId } =
    req.body.data;
  console.log(req.body.data);
  pishnihads
    .exists({ UserID: userId, PishnihadNo: pishnihadNo })
    .then((existingPishnihad) => {
      if (existingPishnihad) {
        return res.status(400).json({
          message: "د پیشنهاد نمبر تکراری دی/ شماره پیشنهاد تکراری است",
        });
      } else {
        const pishnihad = new pishnihads({
          PishnihadNo: pishnihadNo,
          PishnihadDate: pishnihadDate,
          Recipent: recipent,
          Subject: subject,
          Context: context,
          UserID: userId,
        });
        console.log("Second Else");
        pishnihad
          .save()
          .then((result) => {
            res
              .status(201)
              .json({ message: "New pishnihad created", pishnihads: result });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Istehlaam Post Error",
              IstehlaamError: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Istehlaam Post Error",
        IstehlaamError: err,
      });
    });
};

// Getting Istehlaam List
exports.getPishnihadlist = (req, res, next) => {
  const { userId } = req.body.data;

  console.log(userId, "userId");

  pishnihads.find({ UserID: userId }).then((result) => {
    res
      .status(201)
      .json({ message: "Data of the pishnihads", pishnihadsList: result });
  });
};
