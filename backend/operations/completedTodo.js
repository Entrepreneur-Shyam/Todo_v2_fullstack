const express = require("express");

const {
  allTodos,
  completedTodos,
  failedTodos,
  getTodos,
  shiftTodo,
} = require("../mongodbUsingMongoose/dataMongoose");

const completedTodosRoute = express.Router();
completedTodosRoute.use(express.json());
completedTodosRoute.use(express.urlencoded({ extended: true }));

completedTodosRoute.get("/", (req, res) => {
  try {
    getTodos({ collection: completedTodos, response: res,identifier:"completedTodos" });
  } catch (error) {
    res.json("Something went wrong in fetching data");
  }
});

completedTodosRoute.delete("/toFailedTodos/:id", (req, res) => {
  const todoId = req.params.id;
  try {
    shiftTodo({
      id: todoId,
      from: completedTodos,
      to: failedTodos,
      response: res,
    });
  } catch (error) {
    res.send("Problem in remomve completed todo and adding failedTodos");
  }
});

completedTodosRoute.delete("/toAllTodos/:id",  (req, res) => {
  const todoId = req.params.id;

  try {
    shiftTodo({
      id: todoId,
      from: completedTodos,
      to: allTodos,
      response: res,
    });
  } catch (error) {
    res.send("Problem in reset complted todo");
  }
});

module.exports = completedTodosRoute;
