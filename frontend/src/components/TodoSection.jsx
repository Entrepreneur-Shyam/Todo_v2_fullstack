import { useCallback, useEffect, useReducer} from "react";
import { addTodo, fetchTodos, shiftTodo } from "./TodoSection/function";
import { Outlet, useNavigate } from "react-router-dom";
import AddTodo from "./TodoSection/Addtodo";
import TodoStatus from "./TodoSection/TodoStatus";
import log from "../log";
import { initialState, reducer } from "./Store/TodoReducer";

const TodoSection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const fetchTodoList = useCallback(
    async function () {
      let fetchData;
      switch (state.status) {
        case "allTodos":
          fetchData = await fetchTodos({ route: "allTodos" });
          navigate("allTodos");
          break;
        case "completedTodos":
          fetchData = await fetchTodos({ route: "completedTodos" });
          break;
        case "failedTodos":
          fetchData = await fetchTodos({ route: "failedTodos" });
          break;
        default:
          fetchData = [];
      }
      dispatch({ type: "SET_TODOS", todos: fetchData });
    },
    [state.status, navigate]
  );

  useEffect(() => {
    fetchTodoList();
    console.log("From useEffect todosection");
  }, [fetchTodoList]);

  const handleStatusChange = useCallback((status) => {
    dispatch({ type: "SET_STATUS", status });
    console.log("Status check", status);
  }, []);

  const handleAddNewTodo = useCallback(async function (newTodo) {
    const updatedTodoAfterNewTodo = await addTodo(newTodo);
    dispatch({ type: "SET_TODOS", todos: updatedTodoAfterNewTodo });
  }, []);

  async function allTodosToCompletedTodos(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "allTodos",
      toRoute: "toCompletedTodos",
      id,
    });

    console.log("updatedTodos here", updatedTodos);
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }
  async function allTodosToFailedTodos(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "allTodos",
      toRoute: "toFailedTodos",
      id,
    });
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }
  async function deleteTodos(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "allTodos",
      id,
    });
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }

  async function completedTodosToFailedTodos(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "completedTodos",
      toRoute: "toFailedTodos",
      id,
    });
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }
  async function completedTodoReset(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "completedTodos",
      toRoute: "toAllTodos",
      id,
    });
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }
  async function failedTodosToCompletedTodos(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "failedTodos",
      toRoute: "toCompletedTodos",
      id,
    });
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }
  async function failedTodoReset(id) {
    const updatedTodos = await shiftTodo({
      fromRoute: "failedTodos",
      toRoute: "toAllTodos",
      id,
    });
    dispatch({ type: "SET_TODOS", todos: updatedTodos });
  }

  log("Todo Section redner", "gray", "white");
  return (
    <div className="w-[50vw] flex flex-col items-center">
      <AddTodo handleAddTodo={handleAddNewTodo} status={state.status} />
      <TodoStatus
        changedStatusAllTodos={() => handleStatusChange("allTodos")}
        changedStatusCompletedTodos={() => handleStatusChange("completedTodos")}
        changedStatusFailedTodos={() => handleStatusChange("failedTodos")}
      />
      <Outlet
        context={{
          todos: state.todos,
          activeStatus: state.status,

          allTodosToCompletedTodos,
          allTodosToFailedTodos,
          deleteTodos,
          completedTodosToFailedTodos,
          completedTodoReset,
          failedTodosToCompletedTodos,
          failedTodoReset,
        }}
      />
    </div>
  );
};

export default TodoSection;

// import { useCallback, useEffect, useState } from "react";
// import { addTodo, fetchTodos, shiftTodo } from "./TodoSection/function";
// import { Outlet, useNavigate } from "react-router-dom";
// import AddTodo from "./TodoSection/Addtodo";
// import TodoStatus from "./TodoSection/TodoStatus";
// import log from "../log";

// const TodoSection = () => {
//   const [todoStatus, setTodoStatus] = useState({
//     status: "allTodos",
//     todos: [],
//   });
//   const navigate=useNavigate()

//   useEffect(() => {
//     async function fetchTodoList() {
//       let fetchData;
//       switch (todoStatus.status) {
//         case "allTodos":
//           fetchData = await fetchTodos({ route: "allTodos" });
//           navigate("allTodos")
//           break;
//         case "completedTodos":
//           fetchData = await fetchTodos({ route: "completedTodos" });
//           break;
//         case "failedTodos":
//           fetchData = await fetchTodos({ route: "failedTodos" });
//           break;
//         default:
//           fetchData = [];
//       }
//       setTodoStatus((prevState) => ({ ...prevState, todos: fetchData }));
//     }
//     fetchTodoList();
//     console.log("From useEffect todosection");
//   }, [todoStatus.status]);

//   const handleStatusAllTodos = useCallback(
//     () =>
//       setTodoStatus((prevState) => ({
//         ...prevState,
//         status: "allTodos",
//       })),
//     []
//   );
//   const handleStatusCompletedTodos = useCallback(
//     () =>
//       setTodoStatus((prevState) => ({
//         ...prevState,
//         status: "completedTodos",
//       })),
//     []
//   );
//   const handleStatusFailedTodos = useCallback(
//     () =>
//       setTodoStatus((prevState) => ({
//         ...prevState,
//         status: "failedTodos",
//       })),
//     []
//   );

//   const handleAddNewTodo = useCallback(async function (newTodo) {
//     const updatedTodoAfterNewTodo = await addTodo(newTodo);
//     setTodoStatus((prevState) => ({
//       ...prevState,
//       status: "allTodos",
//       todos: updatedTodoAfterNewTodo,
//     }));
//   }, []);

//   async function allTodosToCompletedTodos(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "allTodos",
//       toRoute: "toCompletedTodos",
//       id,
//     });

//     console.log("updatedTodos here",updatedTodos)
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }
//   async function allTodosToFailedTodos(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "allTodos",
//       toRoute: "toFailedTodos",
//       id,
//     });
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }
//   async function deleteTodos(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "allTodos",
//       id,
//     });
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }

//   async function completedTodosToFailedTodos(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "completedTodos",
//       toRoute: "toFailedTodos",
//       id,
//     });
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }
//   async function completedTodoReset(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "completedTodos",
//       toRoute: "toAllTodos",
//       id,
//     });
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }
//   async function failedTodosToCompletedTodos(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "failedTodos",
//       toRoute: "toCompletedTodos",
//       id,
//     });
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }
//   async function failedTodoReset(id) {
//     const updatedTodos = await shiftTodo({
//       fromRoute: "failedTodos",
//       toRoute: "toAllTodos",
//       id,
//     });
//     setTodoStatus((prevState) => ({ ...prevState, todos: updatedTodos }));
//   }

//   log("Todo Section redner", "gray", "white");
//   return (
//     <div className="w-[50vw] flex flex-col items-center">
//       <AddTodo handleAddTodo={handleAddNewTodo} status={todoStatus.status}/>
//       <TodoStatus
//         changedStatusAllTodos={handleStatusAllTodos}
//         changedStatusCompletedTodos={handleStatusCompletedTodos}
//         changedStatusFailedTodos={handleStatusFailedTodos}
//       />
//       <Outlet
//         context={{
//           todos: todoStatus.todos,
//           activeStatus: todoStatus.status,

//           allTodosToCompletedTodos,
//           allTodosToFailedTodos,
//           deleteTodos,
//           completedTodosToFailedTodos,
//           completedTodoReset,
//           failedTodosToCompletedTodos,
//           failedTodoReset,
//         }}
//       />
//     </div>
//   );
// };

// export default TodoSection;
