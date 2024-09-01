import { useCallback, useEffect, useState } from "react";

export default function useFetch({ fetchPath, shiftPathOne, shiftPathTwo }) {
  const [todos, setTodos] = useState([]);

  const URL = "http://localhost:3050";
  useEffect(() => {
    async function fetchTodo() {
      const response = await fetch(`${URL}/${fetchPath}`);
      const data = await response.json();

      // console.log("Data here useEffect customHook.jsx", data);
      setTodos(data.getTodos);
    }

    fetchTodo();

    // console.log("Check in useEffect customHook.jsx");
  }, [fetchPath]);

  const addTodos = useCallback(
    function addTodos(newTodo) {
      fetch(`${URL}/${fetchPath}`, {
        method: "POST",
        body: JSON.stringify({
          title: newTodo,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Data here:", data);
          setTodos(data.getTodos);
        });
    },
    [fetchPath]
  );

  const deleteTodos = useCallback(
    function deleteTodos(id) {
      fetch(`${URL}/${fetchPath}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(() => {
            // console.log("State update ");
            return data.getTodos;
          });
        });
    },
    [fetchPath]
  );

  const shiftTodosPathOne = useCallback(
    function shiftTodosPathOne(id) {
      fetch(`${URL}/${fetchPath}/${shiftPathOne}/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTodos(data.getTodosF);
          // console.log("toTodos inside function: ");
        });
    },
    [fetchPath, shiftPathOne]
  );

  const shiftTodosPathTwo = useCallback(
    function shiftTodosPathTwo(id) {
      fetch(`${URL}/${fetchPath}/${shiftPathTwo}/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTodos(data.getTodosF);
          // console.log("toTodos inside function: ");
        });
    },
    [fetchPath, shiftPathTwo]
  );

  const updatedData = useCallback(
    function updatedData() {
      fetch(`${URL}/${fetchPath}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("Data here: ", data.getTodos);
          setTodos(data.getTodos);
        });
    },
    [fetchPath]
  );

  return {
    todos,
    addTodos,
    deleteTodos,
    shiftTodosPathOne,
    shiftTodosPathTwo,
    updatedData,
  };
}
export function useFetch1() {}
