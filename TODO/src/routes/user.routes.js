import { Router } from "express";
import {
  createTodo,
  updateTodo,
  getAllTodos,
  deleteTodo,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/create", createTodo);
router.put("/update/:id", updateTodo);
router.get("/getalltodos", getAllTodos);
router.delete("/delete/:id", deleteTodo);
export default router;
