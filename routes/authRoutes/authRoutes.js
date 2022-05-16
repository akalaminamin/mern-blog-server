const router = require("express").Router();

const AuthController = require("../../Controllers/authController");
const signupValidation = require("../../Validation/auth/signup")
const loginValidation = require("../../Validation/auth/login")
router.post("/signup", signupValidation, AuthController.signUpPostController);
router.post("/login", loginValidation, AuthController.loginPostController);
router.get("/logout", AuthController.logoutController);
module.exports = router;
