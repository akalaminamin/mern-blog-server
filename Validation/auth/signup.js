const { body } = require("express-validator");
const User = require("../../models/User");
module.exports = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username must be between 2 to 15 char")
    .custom(async (username) => {
      let existUser = await User.findOne({ username });
      if (existUser) {
        return Promise.reject("username already use");
      }
    })
    .trim(),
  body("email")
    .isEmail()
    .withMessage("provide a valid email address")
    .custom(async (email) => {
      let existEmail = await User.findOne({ email });
      if (existEmail) {
        return Promise.reject("E-mail already in use");
      }
    })
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long"),
  body("confirmpassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom(async (confirmpassword, { req }) => {
      if (confirmpassword !== req.body.password) {
        throw new Error("Password does not match"); 
      }
      return true;  
    }),
];
