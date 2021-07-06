const router = require("express").Router();
const authController = require("../controllers/auth_controller");
const validatorMiddleware = require("../middlewares/validation_middleware");

// login
router.get("/login", authController.getLoginPage);

router.post("/login", authController.login);

// register
router.get("/register", authController.getRegisterPage);

router.post(
  "/register",
  validatorMiddleware.validateNewUser(),
  authController.register
);

// forget-password
router.get("/forget-password", authController.getFPasswordPage);

// reset-password
router.get("/reset-password", authController.getRPasswordPage);

module.exports = router;
