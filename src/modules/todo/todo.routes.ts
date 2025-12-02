import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

// get single todo
router.get("/:id", todoController.getSingleTodo);
// post a todo
router.post("/", todoController.createTodo);
// update a todo
router.put("/:id", todoController.updateTodo);

export const todoRoutes = router;