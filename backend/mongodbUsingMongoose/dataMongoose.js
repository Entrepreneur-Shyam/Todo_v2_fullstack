var mongoose = require("mongoose");

const { Schema, model } = mongoose;

const databaseName = mongoose.createConnection(
  "mongodb://localhost:27017/todos_mongoose"
);

const todoSchema = new Schema(
  { title: String, id: String },
  { versionKey: false }
);

const allTodos = databaseName.model("allTodos", todoSchema);
const completedTodos = databaseName.model("compltedTodos", todoSchema);
const failedTodos = databaseName.model("failedTodos", todoSchema);

async function getTodos({ collection, response,identifier }) {
  const getTodos = await collection.find();
  console.log(`fetched getTodos ${identifier} in dataMongoose.js`);
  return response.json({ message: `${identifier} fetched successfully`, getTodos });
}

async function addNewTodo({ title, response }) {
  await allTodos.create({ title });
  const getTodos = await allTodos.find();
  return response.json({ message: "New todo added successfully", getTodos });
}

async function shiftTodo({ id, from, to, response }) {
  let fromTodo = await from.findByIdAndDelete(id);

  const getTodos = await from.find();
  if (from && to) {
    await to.create({ title: fromTodo.title });
    const getTodosF = await from.find();
    response.json({
      message: `Data remove ${from} and set in ${to}`,
      getTodos,
    });
  } else {
    return response.json({
      message: "Data shift successfully",
      getTodos,
    });
  }
}

module.exports = {
  allTodos,
  completedTodos,
  failedTodos,
  getTodos,
  addNewTodo,
  shiftTodo,
};
