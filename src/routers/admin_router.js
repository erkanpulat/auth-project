const router = require("express").Router();
// controller
const adminController = require("../controllers/admin_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware");

// admin home page
router.get(
  "/home",
  [authMiddleware.loggedIn, authMiddleware.isAdmin],
  adminController.getHomePage
);

// admin home page
router.get(
  "/users-table",
  [authMiddleware.loggedIn, authMiddleware.isAdmin],
  adminController.getUserTablePage
);

// user delete on table
router.delete(
  "/users-table/:id",
  [authMiddleware.loggedIn, authMiddleware.isAdmin],
  adminController.deleteUser
);

module.exports = router;
