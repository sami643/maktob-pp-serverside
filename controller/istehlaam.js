const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const isthelaams = require("../models/istehlaam");

// CREATING NEW Istehlaam Documents
exports.newIstehlaam = (req, res, next) => {
  console.log("newIstehlaam is called");

  const { istehlaamNo, istehlaamDate, recipent, subject, context, userId } =
    req.body;
  const isthelaam = new isthelaams({
    IstehlaamNo: istehlaamNo,
    IstehlaamDate: istehlaamDate,
    Recipent: recipent,
    Subject: subject,
    Context: context,
    UserID: userId,
  });
  console.log(istehlaamNo, "istehlaamNo");

  isthelaam
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "New Istehlaam created", isthelaam: result });
    })
    .catch((err) => {
      console.log(err, "Following Error Occured");
    });
};

// Getting Istehlaam List
exports.getIstehlaamsList = (req, res, next) => {
  const { istelaamNo } = req.body;
  console.log("getIstehlaamsList called", istelaamNo);
  isthelaams.find().then((result) => {
    res
      .status(201)
      .json({ message: "Data of the Istehlaams", Istehlaams: result });
  });
};
