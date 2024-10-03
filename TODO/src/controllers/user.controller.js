import mongoose from "mongoose";
import { response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError("Title and description are required", 400);
  }

  const todo = new Todo({
    title,
    description,
  });

  await todo.save();

  return res
    .status(201)
    .json(new ApiResponse(todo, "TODO created successfully"));
});

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  return res
    .status(200)
    .json(new ApiResponse(todos, "Accessed all TODOs successfully"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trimmedId = id.trim(); // Trim whitespace or newline characters
  const { title, description, isCompleted } = req.body;

  const todo = await Todo.findById(trimmedId);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  todo.title = title || todo.title;
  todo.description = description || todo.description;
  todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;

  const updatedTodo = await todo.save();

  res
    .status(200)
    .json(new ApiResponse(updatedTodo, "Todo updated successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const trimmedId = id.trim();

  const todo = await Todo.findById(trimmedId);

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  await Todo.deleteOne({ _id: trimmedId });

  res.status(200).json(new ApiResponse(null, "Todo deleted successfully"));
});

export { createTodo, getAllTodos, deleteTodo, updateTodo };
