const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const maktobs = require("../models/maktob");
const multer = require("multer");
const path = require("path");
const maktob = require("../models/maktob");

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
  if (allReceivers === "ریاست محترم پلان و هماهنگی ستراتیژیک")
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
    .find({ AllReceivers: { $elemMatch: { Receiver: presidency } } })
    .then((result) => {
      res.status(201).json({
        message: "ReceiveMaktob",
        Maktobs_List_data: result,
      });
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
  const { maktobId, senderPresidency, activeList, presidencyName } = req.body;

  // if (activeList === "recievedMaktobs") {
  //   let presidency;
  //   if (presidencyName === "ریاست محترم منابع بشری") presidency = "HRP";
  //   if (presidencyName === "ریاست محترم پلان و هماهنگی ستراتیژیک")
  //     presidency = "P&HSP";
  //   if (presidencyName === "ریاست محترم دفتر مقام") presidency = "DMP";

  //   if (presidencyName === "ریاست محترم تفتیش داخلی") presidency = "TDP";
  //   if (presidencyName === "آمریت سیستم های تکنالوژی معلوماتی و احصائیه")
  //     presidency = "IT&MIS";
  //   if (presidencyName === "معاونیت محترم امور مالی و اداری")
  //     presidency = "F&AD";
  //   if (presidencyName === "ریاست محترم مالی و حسابی") presidency = "F&AP";
  //   if (presidencyName === "ریاست محترم خدمات و املاک") presidency = "A&KHP";
  //   if (presidencyName === "ریاست محترم دعوت و ارشاد") presidency = "D&IP";
  //   if (presidencyName === "آمریت محترم تدارکات") presidency = "TD";
  //   if (presidencyName === "آمریت محترم ولایات") presidency = "PD";
  //   if (presidencyName === "معاونیت محترم امور تخنیکی و مسلکی")
  //     presidency = "T&PD";
  //   if (presidencyName === "ریاست محترم امور تعلیمی و تحصیلی")
  //     presidency = "T&TP";
  //   if (presidencyName === "ریاست محترم امور متعلمین و محصلین")
  //     presidency = "M&MP";
  //   if (presidencyName === "ریاست محترم نصاب و تربیه معلم")
  //     presidency = "N&TMP";
  //   if (presidencyName === "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی")
  //     presidency = "AT&TP";
  //   if (presidencyName === "ریاست محترم تنظیم برنامه های حرفوی")
  //     presidency = "BHP";
  //   if (presidencyName === "ریاست محترم ترنم و فرهنگ") presidency = "T&FP";
  //   if (presidencyName === "ریاست محترم تحقیق و تضمین کیفیت")
  //     presidency = "T&TKP";
  //   if (presidencyName === "مشاوریت محترم تخنیکی") presidency = "TA";
  //   if (presidencyName === "مشاوریت محترم حقوقی") presidency = "HA";
  //   maktobs
  //     .findOne({ MaktobNo: maktobId, PresidencyName: senderPresidency })
  //     .then((maktob) => {
  //       if (maktob) {
  //         maktob.AllReceivers = maktob.AllReceivers.filter(
  //           (receiver) => receiver !== presidency
  //         );
  //         maktob
  //           .save()
  //           .then((updatedMaktob) => {
  //             res.status(201).json({ message: " maktob has been deleted" });
  //           })
  //           .catch((error) => {
  //             console.error("Error saving the modified document:", error);
  //           });
  //       }
  //     });
  // } else if (activeList === "sentMaktobs") {
  //   maktobs
  //     .findOne({ MaktobNo: maktobId, PresidencyName: presidencyName })
  //     .then((maktob) => {
  //       if (!maktob) {
  //         return err;
  //       }
  //       maktob
  //         .updateOne({ $unset: { MaktobSent: 1 } })
  //         .then((updatedMaktob) => {
  //           res.status(201).json({ message: " maktob has been deleted" });
  //         })
  //         .catch((error) => {
  //           console.error("Error saving the modified document:", error);
  //         })
  //         .catch((error) => {
  //           console.error("Error saving the modified document:", error);
  //         });
  //     });
  // } else {

  maktobs
    .findOne({ MaktobNo: maktobId })
    .then((maktob) => {
      if (maktob.MaktobSent) {
        res.status(400).json({
          message: "Sent Maktob can not be deleted",
        });
      } else {
        return maktob.deleteOne().then(() => {
          res.status(201).json({ message: " maktob has delete" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // }
};

// Sending Maktobs
exports.sendMaktob = (req, res) => {
  const { maktobNo, presidencyName, userId, allReceivers, attachedDocmuents } =
    req.body.data;
  maktobs
    .findOne({
      MaktobNo: maktobNo,
      PresidencyName: presidencyName,
      UserID: userId,
    })
    .then((maktob) => {
      if (maktob) {
        console.log(
          "iiner makreakdsgkasdgjksjdgjkldsajgkpo32i40-29304023840923840"
        );
        if (maktob.AllReceivers) {
          const existingReceiversMap = new Map(
            maktob.AllReceivers.map((item) => [item.Receiver, item])
          );
          for (const receiverObj of allReceivers) {
            existingReceiversMap.set(receiverObj.Receiver, receiverObj);
          }
          maktob.AllReceivers = Array.from(existingReceiversMap.values());
        } else {
          maktob.AllReceivers = allReceivers;
        }

        maktob.AttachedDocuments = attachedDocmuents;
        maktob.MaktobSent = true;

        return maktob.save();
      }
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

exports.getTotalUnseenDoc = (req, res, next) => {
  const { unseenDoc } = req.body.data;
  console.log("getTotalUnseenDoc", unseenDoc);

  let presidency;
  if (unseenDoc === "ریاست محترم منابع بشری") presidency = "HRP";
  if (unseenDoc === "ریاست محترم پلان و هماهنگی ستراتیژیک")
    presidency = "P&HSP";
  if (unseenDoc === "ریاست محترم دفتر مقام") presidency = "DMP";

  if (unseenDoc === "ریاست محترم تفتیش داخلی") presidency = "TDP";
  if (unseenDoc === "آمریت سیستم های تکنالوژی معلوماتی و احصائیه")
    presidency = "IT&MIS";
  if (unseenDoc === "معاونیت محترم امور مالی و اداری") presidency = "F&AD";
  if (unseenDoc === "ریاست محترم مالی و حسابی") presidency = "F&AP";
  if (unseenDoc === "ریاست محترم خدمات و املاک") presidency = "A&KHP";
  if (unseenDoc === "ریاست محترم دعوت و ارشاد") presidency = "D&IP";
  if (unseenDoc === "آمریت محترم تدارکات") presidency = "TD";
  if (unseenDoc === "آمریت محترم ولایات") presidency = "PD";
  if (unseenDoc === "معاونیت محترم امور تخنیکی و مسلکی") presidency = "T&PD";
  if (unseenDoc === "ریاست محترم امور تعلیمی و تحصیلی") presidency = "T&TP";
  if (unseenDoc === "ریاست محترم امور متعلمین و محصلین") presidency = "M&MP";
  if (unseenDoc === "ریاست محترم نصاب و تربیه معلم") presidency = "N&TMP";
  if (unseenDoc === "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی")
    presidency = "AT&TP";
  if (unseenDoc === "ریاست محترم تنظیم برنامه های حرفوی") presidency = "BHP";
  if (unseenDoc === "ریاست محترم ترنم و فرهنگ") presidency = "T&FP";
  if (unseenDoc === "ریاست محترم تحقیق و تضمین کیفیت") presidency = "T&TKP";
  if (unseenDoc === "مشاوریت محترم تخنیکی") presidency = "TA";
  if (unseenDoc === "مشاوریت محترم حقوقی") presidency = "HA";

  maktobs
    .find({
      AllReceivers: { $elemMatch: { Receiver: presidency, seen: false } },
    })
    .then((result) => {
      res.status(201).json({
        message: "ReceiveMaktob",
        totalUnseenDoc: result.length,
      });
    });
};

exports.deceaseUnseenDoc = (req, res, next) => {
  const { unseenDoc, id } = req.body.data;
  maktobs.findOne({ _id: id }).then((targetMaktob) => {
    let presidency;
    if (unseenDoc === "ریاست محترم منابع بشری") presidency = "HRP";
    if (unseenDoc === "ریاست محترم پلان و هماهنگی ستراتیژیک")
      presidency = "P&HSP";
    if (unseenDoc === "ریاست محترم دفتر مقام") presidency = "DMP";
    if (unseenDoc === "ریاست محترم تفتیش داخلی") presidency = "TDP";
    if (unseenDoc === "آمریت سیستم های تکنالوژی معلوماتی و احصائیه")
      presidency = "IT&MIS";
    if (unseenDoc === "معاونیت محترم امور مالی و اداری") presidency = "F&AD";
    if (unseenDoc === "ریاست محترم مالی و حسابی") presidency = "F&AP";
    if (unseenDoc === "ریاست محترم خدمات و املاک") presidency = "A&KHP";
    if (unseenDoc === "ریاست محترم دعوت و ارشاد") presidency = "D&IP";
    if (unseenDoc === "آمریت محترم تدارکات") presidency = "TD";
    if (unseenDoc === "آمریت محترم ولایات") presidency = "PD";
    if (unseenDoc === "معاونیت محترم امور تخنیکی و مسلکی") presidency = "T&PD";
    if (unseenDoc === "ریاست محترم امور تعلیمی و تحصیلی") presidency = "T&TP";
    if (unseenDoc === "ریاست محترم امور متعلمین و محصلین") presidency = "M&MP";
    if (unseenDoc === "ریاست محترم نصاب و تربیه معلم") presidency = "N&TMP";
    if (unseenDoc === "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی")
      presidency = "AT&TP";
    if (unseenDoc === "ریاست محترم تنظیم برنامه های حرفوی") presidency = "BHP";
    if (unseenDoc === "ریاست محترم ترنم و فرهنگ") presidency = "T&FP";
    if (unseenDoc === "ریاست محترم تحقیق و تضمین کیفیت") presidency = "T&TKP";
    if (unseenDoc === "مشاوریت محترم تخنیکی") presidency = "TA";
    if (unseenDoc === "مشاوریت محترم حقوقی") presidency = "HA";
    for (let i = 0; i < 20; i++) {
      if (targetMaktob.AllReceivers[i].Receiver === presidency) {
        targetMaktob.AllReceivers[i] = { Receiver: presidency, seen: true };
        return targetMaktob.save();
      }
    }
  });
};
