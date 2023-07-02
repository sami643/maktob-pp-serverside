const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const users = require("../models/auth");

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
        userIdCreatedByDB: user._Id,
        userId: user.UserID,
        presidencyName: user.PresidencyName,
      },
      jwtkey
    );
    console.log("Token: ", token);
    res.status(201).json({ message: "Success", token: token });
  } else {
    res.status(401).json({
      message: "ستاسو ایمیل آدرس یا پسورډ سم ندی/ایمیل آدرس یاپسورد اشتباه",
    });
  }
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

// exports.SignIn= async (req, res) => {

//   if (req.body.role === 'user') {
//     console.log(' user singIn called');

//     const jwtkey = "thisisjwtkey";
//     const { email, password, } = req.body;
//     if (!email || !password)
//       return res
//         .status(201)
//         .json({ message: "please provide email & password!" });

//     const user = await users.findOne({ Email: email });
//     if (!user)
//       return res.status(201)
//         .json({ message: "wrong email or password!" });

//      if (user.Verified != "true") {
//        return res.status(201)
//         .json({ message: "Your Account is not verified! (Check your Email for OTP)" });
//     }

//     if (user.Password === password) {
//       const token = jwt.sign(
//         {
//           userID: user._id,
//           email: user.Email,
//           role: user.Role,
//           name: user.fullName,

//         },
//         jwtkey
//       );
//       console.log("Token: ", token);
//       res.status(201).json({ message: "Success", token });
//     }
//     else {
//       res.status(201).json({ message: "wrong email or password!" });
//     }
//   }

//   else if (req.body.role === "organization") {
//     console.log('org singIn called');

//     const jwtkey = "thisisjwtkey";
//     const { email, password, } = req.body;
//     if (!email || !password)
//       return res
//         .status(201)
//         .json({ message: "please provide email & password!" });

//     const user = await organizations.findOne({ Email: email });
//     if (!user)
//       return res.status(201)
//         .json({ message: "wrong email or password!" });

//     if (user.Password === password) {
//       const token = jwt.sign(
//         {
//           userID: user._id,
//           email: user.Email,
//           role: user.Role,
//           name: user.OrgName,
//         },
//         jwtkey
//       );
//       console.log("Token: ", token);
//       res.status(201).json({ message: "Success", token });
//     }
//     else {
//       res.status(201).json({ message: "wrong email or password!" });
//     }
//   }
