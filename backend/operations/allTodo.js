const express = require("express");
const {
  allTodos,
  completedTodos,
  failedTodos,
  getTodos,
  addNewTodo,
  shiftTodo,
} = require("../mongodbUsingMongoose/dataMongoose");

const allTodosRoute = express.Router();
allTodosRoute.use(express.json());
allTodosRoute.use(express.urlencoded({ extended: true }));

allTodosRoute.get("/", (req, res) => {
  try {
    getTodos({ collection: allTodos, response: res,identifier:"allTodos" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something wrong on fetching data" });
  }
});

allTodosRoute.post("/", (req, res) => {
  const title = req.body.title;
  try {
    addNewTodo({ title, response: res });
  } catch (error) {
    console.log(error);
  }
});

allTodosRoute.delete("/:id", (req, res) => {
  const todoId = req.params.id;
  try {
    shiftTodo({ id: todoId, from: allTodos, response: res });
  } catch (error) {
    res.json({
      message:
        JSON.parse(error.message) ||
        "Something went wrong in deleting todo from all todos",
    });
  }
});

allTodosRoute.delete("/toFailedTodos/:id", (req, res) => {
  const todoId = req.params.id;
  try {
    shiftTodo({
      id: todoId,
      from: allTodos,
      to: failedTodos,
      response: res,
    });
  } catch (error) {
    res.json({ message: error.message || "Problem in adding to failed todos" });
  }
});

allTodosRoute.delete("/toCompletedTodos/:id", (req, res) => {
  const todoId = req.params.id;
  try {
    shiftTodo({
      id: todoId,
      from: allTodos,
      to: completedTodos,
      response: res,
    });
  } catch (error) {
    res.json({
      message: error.message || "Problem in adding to completed todos",
    });
  }
});

module.exports = allTodosRoute;

// const id = '66bf9974339a8bcd29b979b5';

// if (mongoose.Types.ObjectId.isValid(id)) {
//   toCompletedToodosFromAllToods(id).then(result => {
//     console.log('Todo moved to completed:', result);
//   }).catch(err => {
//     console.error('Error:', err);
//   });
// } else {
//   console.error('Invalid ObjectId');
// }
