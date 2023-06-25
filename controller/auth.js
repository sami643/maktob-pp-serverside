const req = require("express/lib/request");
const { send } = require("express/lib/response");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const users = require("../models/auth");

exports.login = (req, res, next) => {
  console.log("User Is called");
  const user = new users();
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
