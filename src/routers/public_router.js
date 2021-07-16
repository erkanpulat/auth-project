const router = require("express").Router();
// controllers
const publicController = require("../controllers/public_controller");
// middlewares
const authMiddleware = require("../middlewares/auth_middleware");

// home routes - scissors crossover :D
router.get("/", authMiddleware.loggedIn, publicController.getHomePage);

module.exports = router;
