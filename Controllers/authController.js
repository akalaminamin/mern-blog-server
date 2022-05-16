const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/errorFormater");
class AuthController {
  async signUpPostController(req, res) {
    try {
      const { email, password, username } = req.body;
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        res.json({
          error: errors.mapped(),
          value: { email, password, username }, 
        });
      }
      const hashpassword = await bcrypt.hash(password, 10);
      const user = User({
        username,
        email,
        password: hashpassword,
      });
      const saveData = await user.save();
      res.status(201).json("Signup successfull", saveData);
    } catch (error) {
      res.json(error);
    }
  }
  async loginPostController(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      const { email, password } = req.body;
      if (!errors.isEmpty()) {
        console.log(errors.mapped())
        res.json({ error: errors.mapped(), value: { email, password } });
      }
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json("User Not Found"); 
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        res.status(404).json({error: "User Not Found"});
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  async logoutController(req, res) {}   
}

module.exports = new AuthController();
