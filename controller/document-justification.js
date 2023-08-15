const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const documentsJustification = require("../models/document-justification");

exports.maktobJustification = (req, res) => {
  const {
    molahizaTitle,
    maktobNo,
    molahizaContext,
    maktobSenderPresidency,
    maktobReceiverPresidency,
    molahizaDate,
    directorate,
  } = req.body.data;
  console.log(req.body.data);
  const document = new documentsJustification({
    MolahizaTitle: molahizaTitle,
    MaktobNo: maktobNo,
    MolahizaContext: molahizaContext,
    MaktobSenderPresidency: maktobSenderPresidency,
    MaktobReceiverPresidency: maktobReceiverPresidency,
    MolahizaDate: molahizaDate,
    Directorate: directorate,
  });
  document.save().then((result) => {
    res.status(201).json({
      message: "مکتوب ملاحظه شو/ مکتوب ملاحظه شد",
      maktobJustified: result,
    });
  });
};

exports.gettingMaktobJustification = (req, res) => {
  const { maktobNo, maktobSenderPresidency, maktobReceiverPresidency } =
    req.body.data;
  documentsJustification
    .findOne({
      MaktobNo: maktobNo,
      MaktobReceiverPresidency: maktobReceiverPresidency,
      MaktobSenderPresidency: maktobSenderPresidency,
    })
    .then((result) => {
      res.status(201).json({
        message: "مکتوب ملاحظه شو/ مکتوب ملاحظه شد",
        maktobJustified: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
