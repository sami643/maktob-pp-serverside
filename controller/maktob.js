const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const maktobs = require("../models/maktob");

// CREATING new Maktob or Update Maktob
exports.newMaktob = (req, res, next) => {
  const {
    maktobId,
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
  if (maktobId === "newMaktob" && maktobId.length < 15) {
    console.log("New Maktob is called");
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
                newlyAddedMaktob: result,
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
  } else if (maktobId.length > 15) {
    console.log("updating is on Fire ");
    maktobs
      .exists({
        UserID: userId,
        MaktobNo: maktobNo,
        _id: { $ne: maktobId },
      })
      .then((existingMaktob) => {
        if (existingMaktob) {
          return res.status(400).json({
            message: "د مکتوب نمبر تکراری دی/ شماره مکتبوب تکراری است",
          });
        } else {
          maktobs
            .findOne({ _id: maktobId })
            .then((maktob) => {
              maktob.MaktobNo = maktobNo;
              maktob.MaktobDate = maktobDate;
              maktob.MaktobType = maktobType;
              maktob.Recipent = recipent;
              maktob.Subject = subject;
              maktob.Context = context;
              // maktob.CopyTo = organizers;
              return maktob.save();
            })
            .then((result) => {
              res.status(201).json({
                message:
                  "مکتوب په بریالیتوب سره اپدیت شو/ مکتوب موفقانه اپدیت گردید",
                UpdatedMaktob: result,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }
};

// Getting Istehlaams List
exports.getmaktobLists = (req, res, next) => {
  const { userId, presidencyName } = req.body.data;
  // console.log(userId, presidencyName);
  maktobs
    .find({ UserID: userId, PresidencyName: presidencyName })
    .then((result) => {
      res.status(201).json({ Maktobs_List_data: result });
    });
};

// Getting specific Maktob
exports.getMaktobBaseOnId = (req, res) => {
  const { maktobId, userId } = req.body.data;

  if (maktobId && maktobId.length < 12) {
    maktobs.findOne({ MaktobNo: maktobId, UserID: userId }).then((result) => {
      res
        .status(201)
        .json({ message: "Required Maktob: ", uniqueMaktob: result });
      console.log(result, "dsfsdf");
    });
  } else if (maktobId && maktobId.length > 12) {
    maktobs.findOne({ _id: maktobId }).then((result) => {
      res
        .status(201)
        .json({ message: "Required Maktob: ", uniqueMaktob: result });
    });
  }
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

// // Updating the maktob
// exports.updateMakob = (req, res) => {
//   const {
//     makttobIdForUpdate,
//     maktobNo,
//     maktobDate,
//     recipent,
//     subject,
//     context,
//     maktobType,
//     userId,
//   } = req.body.data;
//   console.log("first update");
//   maktobs
//     .exists({
//       UserID: userId,
//       MaktobNo: maktobNo,
//       _id: { $ne: makttobIdForUpdate },
//     })
//     .then((existingMaktob) => {
//       if (existingMaktob) {
//         return res.status(400).json({
//           message: "د مکتوب نمبر تکراری دی/ شماره مکتبوب تکراری است",
//         });
//       } else {
//         maktobs
//           .findOne({ _id: makttobIdForUpdate })
//           .then((maktob) => {
//             maktob.MaktobNo = maktobNo;
//             maktob.MaktobDate = maktobDate;
//             maktob.MaktobType = maktobType;
//             maktob.Recipent = recipent;
//             maktob.Subject = subject;
//             maktob.Context = context;
//             // maktob.CopyTo = organizers;
//             return maktob.save();
//           })
//           .then((result) => {
//             res.status(201).json({
//               message: "Maktob Successfully Updated",
//               UpdatedMaktob: result,
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     });
// };
