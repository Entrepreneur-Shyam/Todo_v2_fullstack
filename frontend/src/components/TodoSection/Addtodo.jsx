import { memo, useCallback, useRef } from "react";

import log from "../../log";


export default memo(function AddTodo({ handleAddTodo, status }) {
  // const { addNewTodo } = useContext(TodoContext);
  const inputTodo = useRef();

  // function handleAddTodo() {
  //   const newTodo = inputTodo.current.value;
  //   addTodo(newTodo);
  //   inputTodo.current.value=""
  // }

  const addNewTodo = useCallback(async () => {
    const newTodo = inputTodo.current.value;
    handleAddTodo(newTodo);
    inputTodo.current.value = "";
  }, [handleAddTodo]);
  log("Addtodo input field render", "green");
  return status === "allTodos" ? (
    <div className=" flex items-center h-[100px]">
      <div className="flex gap-3 justify-between w-[40vw] bg-slate-600  p-2 ">
        <input
          className="rounded-lg flex-grow px-3"
          type="text"
          ref={inputTodo}
          placeholder="Type your new todo here"
        />
        <button
          onClick={addNewTodo}
          className="bg-slate-100 py-2 px-5 rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  ) : (
    <div className=" flex items-center h-[100px]">
      <h1 className="text-2xl font-semibold bg-slate-100 p-2 rounded-md">Go to all todos section to add more todo</h1>
    </div>
  );
});
