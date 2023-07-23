const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const users = require("../models/auth");
const expiresIn = "2m"; // Token will expire in 1 hour

//  User Login
exports.login = async (req, res, next) => {
  const { userId, password } = req.body.data;
  console.log("User Is called", userId, password);

  const jwtkey = "thisisjwtkey";

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
};

exports.gettigReceivedMaktobUserData = (req, res, next) => {
  const { userId } = req.body.data;
  console.log("isClasaed", userId);

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
exports.signUp = (req, res, next) => {
  const {
    userId,
    password,
    presidencyName,
    presidentName,
    directorate,
    director,
    phoneNo,
    higherAuthority,
    email,
  } = req.body;
  console.log(req.body);
  users
    .exists({ UserID: userId })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({
          message: "کاپی یوزر",
        });
      } else {
        console.log("inner else messagess");
        const user = new users({
          UserID: userId,
          Password: password,
          PresidencyName: presidencyName,
          PresidentName: presidentName,
          Directorate: directorate,
          Director: director,
          PhoneNo: phoneNo,
          HigherAuthority: higherAuthority,
          Email: email,
        });

        user
          .save()
          .then((result) => {
            console.log("inner messagess");
            res.status(201).json({
              message: "نوی یوزر جوړ شو",
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
};
