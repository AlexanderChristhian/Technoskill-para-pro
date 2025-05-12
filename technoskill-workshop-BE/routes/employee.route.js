const express = require("express");
const employeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/add", authMiddleware, employeeController.addEmployee);
router.post("/get", employeeController.getEmployee);
router.get('/:id', employeeController.getOneEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee); 
router.put('/:id', authMiddleware, employeeController.updateEmployee);

module.exports = router;
