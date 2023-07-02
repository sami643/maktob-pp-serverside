const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const isthelaams = require("../models/istehlaam");

// CREATING NEW Istehlaam Documents
exports.newIstehlaam = (req, res, next) => {
  const {
    istehlaamNo,
    istehlaamDate,
    recipent,
    subject,
    context,
    userId,
    presidencyName,
  } = req.body.data;

  console.log(req.body.data);
  isthelaams
    .exists({ UserID: userId, IstehlaamNo: istehlaamNo })
    .then((existingIstehlaam) => {
      if (existingIstehlaam) {
        return res.status(400).json({
          message: "د استعلام نمبر تکراری دی/ شماره استعلام تکراری است",
        });
      } else {
        const isthelaam = new isthelaams({
          IstehlaamNo: istehlaamNo,
          IstehlaamDate: istehlaamDate,
          Recipent: recipent,
          Subject: subject,
          Context: context,
          UserID: userId,
          PresidencyName: presidencyName,
        });
        console.log("Second Else");
        isthelaam
          .save()
          .then((result) => {
            console.log("inside Save");
            res.status(201).json({
              IstehlaamResponseFromBackend: result,
            });
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
        message: "Error finding Istehlaam",
        Error: err,
      });
    });
};

// Getting Istehlaam List
exports.getIstehlaamsList = (req, res, next) => {
  const { userId, presidencyName } = req.body.data;
  isthelaams
    .find({ UserID: userId, PresidencyName: presidencyName })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Data of the Istehlaams", IstehlaamsList: result });
    });
};
