const router = require("express").Router();
const authController = require("../controllers/auth_controller");

// login
router.get("/login", authController.getLoginPage);

// register
router.get("/register", authController.getRegisterPage);

// forget-password
router.get("/forget-password", authController.getFPasswordPage);

// reset-password
router.get("/reset-password", authController.getRPasswordPage);

module.exports = router;
