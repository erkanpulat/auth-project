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
  [authMiddleware.notLoggedIn, validatorMiddleware.validateLoginUser()],
  authController.login
);

// logout
router.get("/logout", authMiddleware.loggedIn, authController.logout);

// register
router.get(
  "/register",
  authMiddleware.notLoggedIn,
  authController.getRegisterPage
);

router.post(
  "/register",
  [authMiddleware.notLoggedIn, validatorMiddleware.validateNewUser()],
  authController.register
);

// forget-password
router.get(
  "/forget-password",
  authMiddleware.notLoggedIn,
  authController.getFPasswordPage
);

router.post(
  "/forget-password",
  [authMiddleware.notLoggedIn, validatorMiddleware.validateEmail()],
  authController.fPassword
);

// reset-password
router.get(
  "/reset-password/:id/:token",
  authMiddleware.notLoggedIn,
  authController.getRPasswordPage
);

router.post(
  "/reset-password",
  [authMiddleware.notLoggedIn, validatorMiddleware.validatePassword()],
  authController.rPassword
);

// verify email
router.get("/verify", authMiddleware.notLoggedIn, authController.verifyMail);

module.exports = router;
