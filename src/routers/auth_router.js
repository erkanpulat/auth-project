const router = require("express").Router();
// controller
const authController = require("../controllers/auth_controller");
// middlewares
const validatorMiddleware = require("../middlewares/validation_middleware");
const authMiddleware = require("../middlewares/auth_middleware");

// login
router.get("/login", authMiddleware.notLoggedIn, authController.getLoginPage);

router.post(
  "/login",
  validatorMiddleware.validateLoginUser(),
  authController.login
);

// register
router.get(
  "/register",
  authMiddleware.notLoggedIn,
  authController.getRegisterPage
);

router.post(
  "/register",
  validatorMiddleware.validateNewUser(),
  authController.register
);

// forget-password
router.get(
  "/forget-password",
  authMiddleware.notLoggedIn,
  authController.getFPasswordPage
);

// reset-password
router.get(
  "/reset-password",
  authMiddleware.notLoggedIn,
  authController.getRPasswordPage
);

module.exports = router;
