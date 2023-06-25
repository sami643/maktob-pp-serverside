const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const maktobs = require("../models/maktob");

// CREATING NEW Istehlaam Documents
exports.newMaktob = (req, res, next) => {
  console.log("New Maktob is called");
  const { maktobNo, maktobDate, recipent, subject, context, userId } =
    req.body.data;
  console.log(req.body.data);

  maktobs
    .exists({ UserID: userId, MaktobNo: maktobNo })
    .then((existingMaktob) => {
      if (existingMaktob) {
        return res.status(400).json({
          message: "د مکتوب نمبر تکراری دی/ شماره مکتبوب تکراری است",
        });
      } else {
        const maktob = new maktobs({
          MaktobNo: maktobNo,
          MaktobDate: maktobDate,
          Recipent: recipent,
          Subject: subject,
          Context: context,
          UserID: userId,
        });

        console.log("MaktobNo", maktob.MaktobNo);

        maktob
          .save()
          .then((result) => {
            res
              .status(201)
              .json({
                message: "نوی مکتبوب ثبت شو/ مکتوب جدید ثبت شو",
                Maktob: result,
              });
          })
          .catch((err) => {
            console.log(err, "Following Error Occured", err);
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
exports.getmaktobLists = (req, res, next) => {
  const { userId } = req.body.data;
  maktobs.find({ UserID: userId }).then((result) => {
    res.status(201).json({ Maktobs_List_data: result });
  });
};
