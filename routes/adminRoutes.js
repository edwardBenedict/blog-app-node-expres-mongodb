const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.adminIndex);

router.get("/add", adminController.admniAdd);

router.post("/add", adminController.adminAddPost);

router.delete("/delete/:id", adminController.adminDeletePost);

module.exports = router;
