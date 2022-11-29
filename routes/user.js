const express = require("express");
const router = express.Router();
const userController = require('../controller/user');
const taskController = require('../controller/task');
const authMiddleware = require("../middleware/auth");
const HelperUtils = require("../utils/helpers");
const upload = require('../config/multer.config')


// routes
router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.get("/user-details", authMiddleware, userController.getUser);
router.put("/user-details/:id", authMiddleware, userController.updateUser);
router.delete("/user-details/:id", authMiddleware, userController.deleteUser);

router.delete('/logout', authMiddleware, userController.logout)

// Task
router.post("/task", authMiddleware, taskController.addTask);
router.get("/task",  authMiddleware,taskController.getTask);
router.put("/task/:id", authMiddleware, taskController.putTask);
router.delete("/task/:id", authMiddleware, taskController.deleteTask);


router.post("/files",authMiddleware, upload.array('files', 4), taskController.uploadMultipleFiles);

module.exports = router;
