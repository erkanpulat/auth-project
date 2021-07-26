const router = require("express").Router();
// controller
const adminController = require("../controllers/admin_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware"); // middlewares
const validatorMiddleware = require("../middlewares/validation_middleware");

// admin home page
router.get(
  "/home",
  [authMiddleware.loggedIn, authMiddleware.isAdmin],
  adminController.getHomePage
);

// admin users-table
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

// admin profile page
router.get(
  "/profile",
  [authMiddleware.loggedIn, authMiddleware.isAdmin],
  adminController.getProfilePage
);

// admin profile update
router.post(
  "/profile",
  validatorMiddleware.validateFullName(),
  adminController.profileUpdate
);

module.exports = router;
