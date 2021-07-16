const router = require("express").Router();
// controller
const userController = require("../controllers/user_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware");

// home page
router.get("/home", authMiddleware.loggedIn, userController.getHomePage);

module.exports = router;
