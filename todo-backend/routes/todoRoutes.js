const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.get("/todo", todoController.getAllTasks);
router.get("/todo/:id", todoController.getTaskById);
router.post("/todo", todoController.createTask);
router.put("/todo/:id", todoController.updateTask);
router.delete("/todo/:id", todoController.deleteTask);
router.delete("/todo/", todoController.removeTasks);

module.exports = router;
