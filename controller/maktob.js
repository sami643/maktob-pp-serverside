const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const maktobs = require("../models/maktob");
const multer = require("multer");
const path = require("path");

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
            UserStatus: "owner",
            NewMaktob: true,
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
  const {
    userId,
    presidencyName,
    userStatus,
    maktobSent,
    newMaktob,
    allReceivers,
  } = req.body.data;
  if (maktobSent === true)
    maktobs
      .find({
        UserID: userId,
        PresidencyName: presidencyName,
        UserStatus: userStatus,
        MaktobSent: maktobSent,
      })
      .then((result) => {
        res.status(201).json({ Maktobs_List_data: result });
      });
  else
    maktobs
      .find({
        UserID: userId,
        PresidencyName: presidencyName,
        UserStatus: userStatus,
        NewMaktob: newMaktob,
      })
      .then((result) => {
        res.status(201).json({ Maktobs_List_data: result });
      });
};

//Retreiving the Received Maktobs List
exports.getReceivedMaktobLists = (req, res, next) => {
  const { allReceivers } = req.body.data;
  let presidency;
  if (allReceivers === "ریاست محترم منابع بشری") presidency = "HRP";
  if (allReceivers === "ریاست محترم پلان و هماهنگی ستراتیژیک ")
    presidency = "P&HSP";
  if (allReceivers === "ریاست محترم دفتر مقام") presidency = "DMP";

  if (allReceivers === "ریاست محترم تفتیش داخلی") presidency = "TDP";
  if (allReceivers === "آمریت سیستم های تکنالوژی معلوماتی و احصائیه")
    presidency = "IT&MIS";
  if (allReceivers === "معاونیت محترم امور مالی و اداری") presidency = "F&AD";
  if (allReceivers === "ریاست محترم مالی و حسابی") presidency = "F&AP";
  if (allReceivers === "ریاست محترم خدمات و املاک") presidency = "A&KHP";
  if (allReceivers === "ریاست محترم دعوت و ارشاد") presidency = "D&IP";
  if (allReceivers === "آمریت محترم تدارکات") presidency = "TD";
  if (allReceivers === "آمریت محترم ولایات") presidency = "PD";
  if (allReceivers === "معاونیت محترم امور تخنیکی و مسلکی") presidency = "T&PD";
  if (allReceivers === "ریاست محترم امور تعلیمی و تحصیلی") presidency = "T&TP";
  if (allReceivers === "ریاست محترم امور متعلمین و محصلین") presidency = "M&MP";
  if (allReceivers === "ریاست محترم نصاب و تربیه معلم") presidency = "N&TMP";
  if (allReceivers === "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی")
    presidency = "AT&TP";
  if (allReceivers === "ریاست محترم تنظیم برنامه های حرفوی") presidency = "BHP";
  if (allReceivers === "ریاست محترم ترنم و فرهنگ") presidency = "T&FP";
  if (allReceivers === "ریاست محترم تحقیق و تضمین کیفیت") presidency = "T&TKP";
  if (allReceivers === "مشاوریت محترم تخنیکی") presidency = "TA";
  if (allReceivers === "مشاوریت محترم حقوقی") presidency = "HA";

  maktobs
    .find({
      AllReceivers: {
        $in: [presidency],
      },
    })
    .then((resul11t) => {
      res.status(201).json({ Maktobs_List_data: resul11t });
    });
};

// Getting MaktobNo
exports.getmaktobNo = (req, res, next) => {
  const { userId, presidencyName } = req.body.data;
  maktobs
    .find({
      UserID: userId,
      PresidencyName: presidencyName,
      UserStatus: "owner",
      NewMaktob: true,
    })
    .then((result) => {
      res.status(201).json({ MaktobNoPlusOne: result.length + 1 });
    });
};

// Getting specific Maktob
exports.getMaktobBaseOnId = (req, res) => {
  const { maktobId, userId } = req.body.data;

  if (maktobId && maktobId.length < 12) {
    maktobs.findOne({ MaktobNo: maktobId, UserID: userId }).then((result) => {
      res
        .status(201)
        .json({ message: "Required Maktob : ", uniqueMaktob: result });
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

// Sending Maktobs
exports.sendMaktob = (req, res) => {
  console.log("send Maktob is Called:");
  const { maktobNo, presidencyName, userId, allReceivers, attachedDocmuents } =
    req.body.data;
  console.log("details: ", attachedDocmuents);
  maktobs
    .findOne({
      MaktobNo: maktobNo,
      PresidencyName: presidencyName,
      UserID: userId,
    })
    .then((maktob) => {
      if (maktob.AllReceivers) {
        const existingReceiversSet = new Set(maktob.AllReceivers);
        const newReceiversSet = new Set(allReceivers);
        for (const receiver of newReceiversSet) {
          existingReceiversSet.add(receiver);
        }
        maktob.AllReceivers = [...existingReceiversSet];
      } else {
        maktob.AllReceivers = allReceivers;
      }
      maktob.AttachedDocuments = attachedDocmuents;

      maktob.MaktobSent = true;

      return maktob.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Maktob Sent successfully", sentMaktob: result });
    })
    .catch((err) => {
      console.log(console.log("Catched error occurred: ", err));
    });
};

exports.fileUpload = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Uploads/Files");
    },
    filename: function (req, file, cb) {
      // cb(null, "PR_001" + "-" + file.originalname);
      return cb(null, `file_${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  const upload = multer({ storage: storage }).array("selectedFile", 5);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload.
      res.send({
        success: false,
        error: "File Can not be added",
      });
    } else if (err) {
      // An unknown error occurred during file upload.
      res.send({
        success: false,
        error: "An error occurred during file upload",
      });
    } else {
      // File upload succeeded.
      if (!req.files || req.files.length === 0) {
        // No files were uploaded.
        res.send({
          success: false,
          error: "No files were uploaded",
        });
      } else {
        const fileUrls = req.files.map(
          (file) => `http://localhost:3006/Uploads/Files/${file.filename}`
        );

        // Files were uploaded successfully.
        res.send({
          success: true,
          message: "Files Saved Successfully",
          file_urls: fileUrls,
        });
      }
    }
  });
};
