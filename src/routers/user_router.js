const router = require("express").Router();
// controller
const userController = require("../controllers/user_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware");

// user home page
router.get(
  "/home",
  authMiddleware.loggedIn,
  authMiddleware.isUser,
  userController.getHomePage
);

module.exports = router;
