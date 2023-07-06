const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");
const maktobs = require("../models/maktob");

// CREATING NEW Istehlaam Documents
exports.newMaktob = (req, res, next) => {
  console.log("New Maktob is called");
  const {
    maktobNo,
    maktobDate,
    recipent,
    subject,
    context,
    userId,
    presidencyName,
    maktobType,
    copyTo,
  } = req.body.data;
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
          PresidencyName: presidencyName,
          MaktobType: maktobType,
          CopyTo: copyTo,
        });

        maktob
          .save()
          .then((result) => {
            res.status(201).json({
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
  const { userId, presidencyName } = req.body.data;
  console.log(userId, presidencyName);
  maktobs
    .find({ UserID: userId, PresidencyName: presidencyName })
    .then((result) => {
      res.status(201).json({ Maktobs_List_data: result });
    });
};

// Getting specific Maktob
exports.getMaktobBaseOnId = (req, res) => {
  const { maktobId } = req.body.data;
  maktobs.findOne({ MaktobNo: maktobId }).then((result) => {
    res
      .status(201)
      .json({ message: "Required Maktob: ", uniqueMaktob: result });
  });
};

// Deleting a Maktob
exports.deleteMaktob = (req, res, next) => {
  const { maktobId } = req.body;

  console.log(maktobId, "maktobb Idt");
  maktobs
    .findOne({ MaktobNo: maktobId })
    .then((maktob) => {
      if (!maktob) {
        return err;
      }

      return maktob.deleteOne();
    })
    .then(() => {
      res.status(201).json({ message: " maktob has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
