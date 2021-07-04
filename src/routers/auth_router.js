const router = require("express").Router();
const authController = require("../controllers/auth_controller");

// login
router.get("/login", authController.getLoginPage);

module.exports = router;
