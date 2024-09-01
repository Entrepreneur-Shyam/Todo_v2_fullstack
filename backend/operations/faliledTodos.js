const express = require("express");

const {
  allTodos,
  completedTodos,
  failedTodos,
  getTodos,
  shiftTodo,
} = require("../mongodbUsingMongoose/dataMongoose");

const failedTodosRoute = express.Router();
failedTodosRoute.use(express.json());
failedTodosRoute.use(express.urlencoded({ extended: true }));

failedTodosRoute.get("/", (req, res) => {
  try {
    getTodos({ collection: failedTodos, response: res,identifier:"failedTodos" });
  } catch (error) {
    res.send("Problem in fetch failed todos");
  }
});

failedTodosRoute.delete("/toCompletedTodos/:id", (req, res) => {
  const todoId = req.params.id;

  try {
    shiftTodo({
      id: todoId,
      from: failedTodos,
      to: completedTodos,
      response: res,
    });
  } catch (error) {
    res.send("Problem in remove failed todo and add to complted todos");
  }
});

failedTodosRoute.delete("/toAllTodos/:id", (req, res) => {
  const todoId = req.params.id;
  try {
    shiftTodo({
      id: todoId,
      from: failedTodos,
      to: allTodos,
      response: res,
    });
  } catch (error) {
    res.send("Problem in reset failed todo");
  }
});

module.exports = failedTodosRoute;
