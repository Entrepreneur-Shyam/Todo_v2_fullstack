import { createContext, useState } from "react";

import useFetch from "./customHook";

export const TodoContext = createContext({
  allTodos: [],
  completedTodos: [],
  failedTodos: [],
  activeStatus: "",
  // authenticationStatus: "",
  addNewTodo: () => {},

  deleteTodos: () => {},
  allTodosToCompletedTodos: () => {},
  allTodosToFailedTodos: () => {},

  completedTodoReset: () => {},
  completedTodosToFailedTodos: () => {},

  failedTodoReset: () => {},
  failedTodosToCompletedTodos: () => {},

  changedStatusAllTodos: () => {},
  changedStatusCompletedTodos: () => {},
  changedStatusFailedTodos: () => {},

  // handleLoginSuccess: () => {},
});

export default function TodoContextProvider({ children }) {
  const [activeStatus, setActiveStatus] = useState("allTodos");
  // const [authenticationStatus, setAuthenticationStatus] = useState("");

  function changedStatusAllTodosHandler() {
    setActiveStatus("allTodos");
    updatedAllTodosData();
  }

  function changedStatusCompletedTodosHandler() {
    setActiveStatus("completedTodos");
    updatedCompletedTodosData();
  }

  function changedStatusFailedTodosHandler() {
    setActiveStatus("failedTodos");
    updatedFailedTodosData();
  }

  const {
    todos: allTodos,
    addTodos: addNewTodoHandler,
    deleteTodos,
    shiftTodosPathOne: allTodosToCompletedTodosHandler,
    shiftTodosPathTwo: allTodosToFailedTodosHandler,
    updatedData: updatedAllTodosData,
  } = useFetch({
    fetchPath: "allTodos",
    shiftPathOne: "toCompletedTodos",
    shiftPathTwo: "toFailedTodos",
  });

  const {
    todos: completedTodos,
    shiftTodosPathOne: completedTodoResetHandler,
    shiftTodosPathTwo: completedTodosToFailedTodosHandler,
    updatedData: updatedCompletedTodosData,
  } = useFetch({
    fetchPath: "completedTodos",
    shiftPathOne: "toAllTodos",
    shiftPathTwo: "toFailedTodos",
  });

  const {
    todos: failedTodos,
    shiftTodosPathOne: failedTodoResetHandler,
    shiftTodosPathTwo: FailedTodosToCompletedTodostHandler,
    updatedData: updatedFailedTodosData,
  } = useFetch({
    fetchPath: "failedTodos",
    shiftPathOne: "toAllTodos",
    shiftPathTwo: "toCompletedTodos",
  });

  // function handleLoginSuccess() {
  //   setAuthenticationStatus("login");
  // }

  const todoCtx = {
    allTodos,
    completedTodos,
    failedTodos,
    activeStatus,
    // authenticationStatus,
    addNewTodo: addNewTodoHandler,

    deleteTodos,
    allTodosToCompletedTodos: allTodosToCompletedTodosHandler,
    allTodosToFailedTodos: allTodosToFailedTodosHandler,

    completedTodoReset: completedTodoResetHandler,
    completedTodosToFailedTodos: completedTodosToFailedTodosHandler,

    failedTodoReset: failedTodoResetHandler,
    failedTodosToCompletedTodos: FailedTodosToCompletedTodostHandler,

    changedStatusAllTodos: changedStatusAllTodosHandler,
    changedStatusCompletedTodos: changedStatusCompletedTodosHandler,
    changedStatusFailedTodos: changedStatusFailedTodosHandler,

    // handleLoginSuccess,
  };

  return (
    <TodoContext.Provider value={todoCtx}>{children}</TodoContext.Provider>
  );
}
