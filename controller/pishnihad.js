const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const pishnihads = require("../models/pishnihad");

// CREATING NEW pishnihad Documents
exports.newPishnihad = (req, res, next) => {
  const {
    pishnihadNo,
    pishnihadDate,
    recipent,
    subject,
    context,
    userId,
    presidencyName,
  } = req.body.data;
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
          PresidencyName: presidencyName,
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

// Getting pishnihad List
exports.getPishnihadlist = (req, res, next) => {
  const { userId, presidencyName } = req.body.data;

  pishnihads
    .find({ UserID: userId, PresidencyName: presidencyName })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Data of the pishnihads", pishnihadsList: result });
    });
};

// Deleting a Pishnihaad
exports.deletePishnihad = (req, res, next) => {
  const { datafromFrontEnd } = req.body;
  console.log(datafromFrontEnd);
  console.log(maktobId, "maktobb Idt");
  pishnihads
    .findOne({ IstehlaamNo: istehlaamId })
    .then((pishnihad) => {
      if (!pishnihad) {
        return err;
      }

      return pishnihad.deleteOne();
    })
    .then(() => {
      res.status(201).json({ message: " pishnihad has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Updating the Pishnihaad
exports.updatePishnihaad = (req, res) => {
  const {
    datafromFrontEnd,
    maktobNo,
    maktobDate,
    maktobType,
    recipent,
    context,
    copyTo,
  } = req.body;
  console.log(datafromFrontEnd);

  // maktobs
  //   .findOne({ MaktobNo: makttobIdForUpdate })
  //   .then((maktob) => {
  //     maktob.MaktobNo = camp_info;
  //     maktob.MaktobDate = venue;
  //     maktob.MaktobType = organizers;
  //     maktob.Recipent = date;
  //     maktob.Subject = time;
  //     maktob.Context = organizers;
  //     maktob.CopyTo = organizers;
  //     return maktob.save();
  //   })
  //   .then((result) => {
  //     res.status(201).json({ message: "Success", UpdatedMaktob: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};
