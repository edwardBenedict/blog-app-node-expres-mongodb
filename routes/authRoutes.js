const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/signup", authController.signUpGet);
router.post("/signup", authController.signUpPost);
router.get("/logout", authController.logoutGet);

module.exports = router;
