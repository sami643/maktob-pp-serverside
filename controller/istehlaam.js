const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const istehlaams = require("../models/istehlaam");

// CREATING NEW Istehlaam And Updating
exports.newIstehlaam = (req, res, next) => {
  const {
    istehlaamId,
    istehlaamNo,
    istehlaamDate,
    recipent,
    subject,
    context,
    userId,
    presidencyName,
  } = req.body.data;

  if (istehlaamId === "newIstehlam" && istehlaamId.length < 15) {
    console.log("New Istehlaam blocked Fired");
    istehlaams
      .exists({ UserID: userId, IstehlaamNo: istehlaamNo })
      .then((existingIstehlaam) => {
        if (existingIstehlaam) {
          return res.status(400).json({
            message: "د استعلام نمبر تکراری دی/ شماره استعلام تکراری است",
          });
        } else {
          const istehlaam = new istehlaams({
            IstehlaamNo: istehlaamNo,
            IstehlaamDate: istehlaamDate,
            Recipent: recipent,
            Subject: subject,
            Context: context,
            UserID: userId,
            PresidencyName: presidencyName,
            UserStatus: "owner",
            IstehlaamSent: false,
          });
          istehlaam
            .save()
            .then((result) => {
              res.status(201).json({
                message: "نوی استعلام ثبت شو/ استعلام جدید ثبت شد",
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
  } else if (istehlaamId.length > 15) {
    console.log("istehlaam Updated Block Fired");
    istehlaams
      .exists({
        UserID: userId,
        IstehlaamNo: istehlaamNo,
        _id: { $ne: istehlaamId },
      })
      .then((existingIstehlaam) => {
        if (existingIstehlaam) {
          return res.status(400).json({
            message: "د استعلام نمبر تکراری دی/ شماره استعلام تکراری است",
          });
        } else {
          istehlaams
            .findOne({ _id: istehlaamId })
            .then((istehlaam) => {
              istehlaam.IstehlaamNo = istehlaamNo;
              istehlaam.IstehlaamDate = istehlaamDate;
              istehlaam.Recipent = recipent;
              istehlaam.Subject = subject;
              istehlaam.Context = context;
              return istehlaam.save();
            })
            .then((result) => {
              res.status(201).json({
                message:
                  "استعلام په بریالیتوب سره اپدیت شو/ استعلام موفقانه اپدیت گردید",
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

// Getting Istehlaam List
exports.getIstehlaamsList = (req, res, next) => {
  const { userId, presidencyName, userStatus, istehlaamSent } = req.body.data;
  istehlaams
    .find({
      UserID: userId,
      PresidencyName: presidencyName,
      UserStatus: userStatus,
      IstehlaamSent: istehlaamSent,
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Data of the Istehlaams", IstehlaamsList: result });
    });
};

// Getting Istehlaam No
exports.getIstehlaamNo = (req, res, next) => {
  const { userId, presidencyName } = req.body.data;
  istehlaams
    .find({
      UserID: userId,
      PresidencyName: presidencyName,
      UserStatus: "owner",
      IstehlaamSent: false,
    })
    .then((result) => {
      res.status(201).json({
        message: "Data of the Istehlaams",
        IstehlaamsNoPlusOne: result.length + 1,
      });
    });
};

// Deleting a Istehlaams
exports.deleteIstehlaam = (req, res, next) => {
  const { istehlaamId, userId } = req.body;

  istehlaams
    .findOne({ IstehlaamNo: istehlaamId, UserID: userId })
    .then((istehlaam) => {
      if (!istehlaam) {
        return err;
      }

      return istehlaam.deleteOne();
    })
    .then(() => {
      res.status(201).json({ message: " istehlaam has been deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Getting specific Istehlaam
exports.getIstehlaamBasedOnId = (req, res) => {
  const { istehlaamId } = req.body.data;

  if (istehlaamId.length < 12) {
    istehlaams.findOne({ IstehlaamNo: istehlaamId }).then((result) => {
      res.status(201).json({
        message: "Required IstehlaamForView: ",
        UniqueIstehlaam: result,
      });
    });
  } else {
    istehlaams.findOne({ _id: istehlaamId }).then((result) => {
      res.status(201).json({
        message: "Required IstehlaamForUpdate: ",
        UniqueIstehlaam: result,
      });
    });
  }
};

// // Updating the Istehlaam
// exports.updateIstehlaam = (req, res) => {
//   const {
//     datafromFrontEnd,
//     maktobNo,
//     maktobDate,
//     maktobType,
//     recipent,
//     context,
//     copyTo,
//   } = req.body;
//   console.log(datafromFrontEnd);

//   // maktobs
//   //   .findOne({ MaktobNo: makttobIdForUpdate })
//   //   .then((maktob) => {
//   //     maktob.MaktobNo = camp_info;
//   //     maktob.MaktobDate = venue;
//   //     maktob.MaktobType = organizers;
//   //     maktob.Recipent = date;
//   //     maktob.Subject = time;
//   //     maktob.Context = organizers;
//   //     maktob.CopyTo = organizers;
//   //     return maktob.save();
//   //   })
//   //   .then((result) => {
//   //     res.status(201).json({ message: "Success", UpdatedMaktob: result });
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// };
