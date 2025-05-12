const express = require("express");
const managerController = require("../controllers/manager.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", managerController.login);
router.post("/register", managerController.register); 
router.post("/logout", authMiddleware, managerController.logout);
router.get("/profile", authMiddleware, managerController.getProfile);
router.post("/update-password", authMiddleware, managerController.updatePassword);

module.exports = router;
