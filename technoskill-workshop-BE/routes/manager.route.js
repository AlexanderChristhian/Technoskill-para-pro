const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.post("/login", managerController.login);
router.post("/register", managerController.register);
// Masukkan rute-rute lain di sini!

module.exports = router;
