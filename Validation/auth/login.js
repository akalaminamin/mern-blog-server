const { body } = require("express-validator");
const User = require("../../models/User");
module.exports = [
  body("email").isEmail().withMessage("Enter login email").normalizeEmail(),  
  body("password").notEmpty().withMessage("Enter login password"),
];
     