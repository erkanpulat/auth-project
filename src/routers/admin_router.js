const router = require("express").Router();
// controller
const adminController = require("../controllers/admin_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware");

// admin home page
router.get(
  "/home",
  authMiddleware.loggedIn,
  authMiddleware.isAdmin,
  adminController.getHomePage
);

module.exports = router;
