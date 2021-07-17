const router = require("express").Router();
// controllers
const publicController = require("../controllers/public_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware");

// home routes - scissors crossover :D , if user authenticated
router.get("/home", authMiddleware.loggedIn, publicController.getHomePage);

// redirect login page , if user not authenticated
router.get("/", authMiddleware.notLoggedIn, publicController.getLoginPage);

module.exports = router;
