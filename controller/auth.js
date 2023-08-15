const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const users = require("../models/auth");
const amiryats = require("../models/amiryat");
const expiresIn = "2m"; // Token will expire in 1 hour

//  User Login
exports.login = async (req, res, next) => {
  const { userId, password, userType } = req.body.data;
  console.log("User Is called", userId, password, userType);

  const jwtkey = "thisisjwtkey";
  if (userType === "presidency") {
    if (!userId || !password)
      return res.status(401).json({ message: "لطفا خپل ایمیل و پسورډ ولیکئ" });

    const user = await users.findOne({ UserID: userId });
    if (!user)
      return res.status(401).json({
        message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
      });

    if (user.Password === password) {
      const token = jwt.sign(
        {
          UserIdCreatedByDB: user._Id,
          UserId: user.UserID,
          PresidencyName: user.PresidencyName,
          PhoneNo: user.PhoneNo,
          PresidentName: user.PresidentName,
          PresidencyNamePashto: user.PresidencyNamePashto,
          Directorate: user.Directorate,
          Director: user.Director,
          Email: user.Email,
          HigherAuthority: user.HigherAuthority,
          HigherAuthorityPashto: user.HigherAuthorityPashto,
          PositionTitle: user.PositionTitle,
          PositionTitlePashto: user.PositionTitlePashto,
          PositionTitlePashto: user.PositionTitlePashto,
        },
        jwtkey,
        { expiresIn }
      );

      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token: token });
    } else {
      res.status(401).json({
        message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
      });
    }
  } else if (userType === "directorate") {
    if (!userId || !password)
      return res.status(401).json({ message: "لطفا خپل ایمیل و پسورډ ولیکئ" });

    const amiryat = await amiryats.findOne({ DirectorateId: userId });
    if (!amiryat)
      return res.status(401).json({
        message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
      });

    if (amiryat.Password === password) {
      const token = jwt.sign(
        {
          UserType: amiryat.UserType,
          Directorate: amiryat.Directorate,
          Director: amiryat.Director,
          DirectoratePashto: amiryat.DirectoratePashto,
          DirectorateId: amiryat.DirectorateId,
          UserId: amiryat.UserId,
          PresidencyName: amiryat.PresidencyName,
          AmiryatTableId: amiryat._id,
        },
        jwtkey,
        { expiresIn }
      );

      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token: token });
    } else {
      res.status(401).json({
        message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
      });
    }
  } else if (userType === "admin") {
    if (!userId || !password)
      return res.status(401).json({ message: "لطفا خپل ایمیل و پسورډ ولیکئ" });

    const admin = await users.findOne({ UserID: userId });
    if (!admin)
      return res.status(401).json({
        message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
      });

    if (admin.Password === password) {
      const token = jwt.sign(
        {
          UserType: admin.UserType,
          UserId: admin.UserID,
        },
        jwtkey,
        { expiresIn }
      );

      console.log("Token: ", token);
      res.status(201).json({ message: "Success", token: token });
    } else {
      res.status(401).json({
        message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
      });
    }
  }
};

exports.gettigReceivedMaktobUserData = (req, res, next) => {
  const { userId } = req.body.data;

  users
    .findOne({ UserID: userId })
    .then((user) => {
      res.status(200).json({
        message: "Success",
        receviveMaktobUserData: user,
      });
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Creating new user
exports.addUser = (req, res, next) => {
  const {
    higherAuthority,
    higherAuthorityPashto,
    presidencyName,
    presidencyNamePashto,
    positionTitle,
    positionTitlePashto,
    presidentName,
    phoneNo,
    email,
    userId,
    password,
    userType,
    director,
    directorate,
    directoratePashto,
    directorateId,
  } = req.body.data;

  if (userType === "presidency") {
    console.log("parewprpojsdofjsoadjfoasd", userId);
    users
      .findOne({ UserID: userId })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({
            message: "کاپی یوزر",
          });
        } else {
          console.log("inner else messagess");
          const user = new users({
            HigherAuthority: higherAuthority,
            HigherAuthorityPashto: higherAuthorityPashto,
            PresidencyName: presidencyName,
            PresidencyNamePashto: presidencyNamePashto,
            PositionTitle: positionTitle,
            PositionTitlePashto: positionTitlePashto,
            PresidentName: presidentName,
            PhoneNo: phoneNo,
            Email: email,
            UserID: userId,
            Password: password,
            UserType: userType,
            Director: director,
            Directorate: directorate,
            DirectoratePashto: directoratePashto,
          });

          user
            .save()
            .then((result) => {
              console.log("inner messagess");
              res.status(201).json({
                message: "نوی یوزر جوړ شو/ یوزر جدید ساخته شد!",
                user: result,
              });
            })
            .catch((err) => {
              console.log(err, "Following Error Occured", err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "User Error Occured",
        });
      });
  } else {
    console.log("amiryat");
    amiryats
      .findOne({ DirectorateId: directorateId })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({
            message: "کاپی آمریت",
          });
        } else {
          console.log("inner else messagess");
          const amiryat = new amiryats({
            DirectorateId: directorateId,
            Password: password,
            UserType: userType,
            Director: director,
            Directorate: directorate,
            DirectoratePashto: directoratePashto,
            UserId: userId,
            PresidencyName: presidencyName,
          });

          amiryat
            .save()
            .then((result) => {
              console.log("inner messagess");
              res.status(201).json({
                message: "نوی آمریت جوړ شو/ آمریت جدید ساخته شد!",
                amiryat: result,
              });
            })
            .catch((err) => {
              console.log(err, "Following Error Occured", err);
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "User Error Occured",
        });
      });
  }
};

exports.amiryatData = (req, res) => {
  const jwtkey = "thisisjwtkey";
  const { userId } = req.body.data;
  users.findOne({ UserID: userId }).then((user) => {
    const token = jwt.sign(
      {
        UserId: user.UserID,
        PresidencyName: user.PresidencyName,
        PhoneNo: user.PhoneNo,
        PresidentName: user.PresidentName,
        PresidencyNamePashto: user.PresidencyNamePashto,
        Directorate: user.Directorate,
        Director: user.Director,
        Email: user.Email,
        HigherAuthority: user.HigherAuthority,
        HigherAuthorityPashto: user.HigherAuthorityPashto,
        PositionTitle: user.PositionTitle,
        PositionTitlePashto: user.PositionTitlePashto,
        PositionTitlePashto: user.PositionTitlePashto,
        UserType: user.UserType,
      },
      jwtkey,
      { expiresIn }
    );
    console.log("Token: ", token);
    res.status(201).json({ message: "Success", AmiryatToken: token });
  });
};
