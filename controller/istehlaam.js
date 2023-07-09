const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const istehlaams = require("../models/istehlaam");
const Pishnihad = require("../models/pishnihad");

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
  istehlaams
    .exists({ UserID: userId, IstehlaamNo: istehlaamNo })
    .then((existingIstehlaam) => {
      if (existingIstehlaam) {
        return res.status(400).json({
          message: "د استعلام نمبر تکراری دی/ شماره استعلام تکراری است",
        });
      } else {
        const isthelaam = new istehlaams({
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
  istehlaams
    .find({ UserID: userId, PresidencyName: presidencyName })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Data of the Istehlaams", IstehlaamsList: result });
    });
};

// Deleting a Istehlaams
exports.deleteIstehlaam = (req, res, next) => {
  const { datafromFrontEnd } = req.body;

  console.log(datafromFrontEnd);

  istehlaams
    .findOne({ IstehlaamNo: istehlaamId })
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
        uniqueIstehlaam: result,
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

// Updating the Istehlaam
exports.updateIstehlaam = (req, res) => {
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
