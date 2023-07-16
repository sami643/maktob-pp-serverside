const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const pishnihads = require("../models/pishnihad");

// CREATING NEW pishnihad Documents
exports.newPishnihad = (req, res, next) => {
  const {
    pishnihadId,
    pishnihadNo,
    pishnihadDate,
    recipent,
    subject,
    context,
    userId,
    presidencyName,
  } = req.body.data;

  if (pishnihadId === "newPishnihad" && pishnihadId.length < 15) {
    console.log("newPishnihadd Block");
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
            UserStatus: "owner",
            PishnihadSent: false,
          });
          pishnihad
            .save()
            .then((result) => {
              res.status(201).json({
                message: "نوی پیشنهاد ثبت شو/ پیشنهاد جدید ساخته شد",
                pishnihads: result,
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
          message: "Istehlaam Post Error",
          IstehlaamError: err,
        });
      });
  } else if (pishnihadId.length > 15) {
    console.log("Pishnihaad Upadte is fired");
    pishnihads
      .exists({
        UserID: userId,
        PishnihadNo: pishnihadNo,
        _id: { $ne: pishnihadId },
      })
      .then((existingPishnihad) => {
        if (existingPishnihad) {
          return res.status(400).json({
            message: "د پیشنهاد نمبر تکراری دی/ شماره پیشنهاد تکراری است",
          });
        } else {
          pishnihads
            .findOne({ _id: pishnihadId })
            .then((pishnihad) => {
              pishnihad.PishnihadNo = pishnihadNo;
              pishnihad.PishnihadDate = pishnihadDate;
              pishnihad.Recipent = recipent;
              pishnihad.Subject = subject;
              pishnihad.Context = context;
              return pishnihad.save();
            })
            .then((result) => {
              res.status(201).json({
                message:
                  "پیشنهاد په بریالیتوب سره اپدیت شو/ پیشنهاد موفقانه اپدیت گردید",
                UpdatedPishnihad: result,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }
};

// Getting pishnihad List
exports.getPishnihadlist = (req, res, next) => {
  const { userId, presidencyName, userStatus, pishnihadSent } = req.body.data;
  pishnihads
    .find({
      UserID: userId,
      PresidencyName: presidencyName,
      UserStatus: userStatus,
      PishnihadSent: pishnihadSent,
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Data of the pishnihads", pishnihadsList: result });
    });
};

// Getting pishnihad No
exports.getPishnihadNo = (req, res, next) => {
  const { userId, presidencyName } = req.body.data;
  pishnihads
    .find({
      UserID: userId,
      PresidencyName: presidencyName,
      UserStatus: "owner",
      PishnihadSent: false,
    })
    .then((result) => {
      res.status(201).json({
        message: "Data of the pishnihads",
        pishnihadNoPlusOne: result.length + 1,
      });
    });
};

// Getting specific Pishnihad
exports.gettingSpecificPishnihad = (req, res) => {
  const { pishnihadId } = req.body.data;
  if (pishnihadId.length < 12) {
    pishnihads.findOne({ PishnihadNo: pishnihadId }).then((result) => {
      res.status(201).json({
        message: "Required pishNihadForView: ",
        uniquePishnihad: result,
      });
    });
  } else {
    pishnihads.findOne({ _id: pishnihadId }).then((result) => {
      res.status(201).json({
        message: "Required pishNihadForUpdate: ",
        uniquePishnihad: result,
      });
    });
  }
};

// Deleting a Pishnihaad
exports.deletePishnihad = (req, res, next) => {
  const { pishnihadId, userId } = req.body;
  pishnihads
    .findOne({ PishnihadNo: pishnihadId, UserID: userId })
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

// // Updating the Pishnihaad
// exports.updatePishnihaad = (req, res) => {
//   const {
//     datafromFrontEnd,
//     maktobNo,
//     maktobDate,
//     maktobType,
//     recipent,
//     context,
//     copyTo,
//   } = req.body;

//   maktobs
//     .findOne({ MaktobNo: makttobIdForUpdate })
//     .then((maktob) => {
//       maktob.MaktobNo = camp_info;
//       maktob.MaktobDate = venue;
//       maktob.MaktobType = organizers;
//       maktob.Recipent = date;
//       maktob.Subject = time;
//       maktob.Context = organizers;
//       maktob.CopyTo = organizers;
//       return maktob.save();
//     })
//     .then((result) => {
//       res.status(201).json({ message: "Success", UpdatedMaktob: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
