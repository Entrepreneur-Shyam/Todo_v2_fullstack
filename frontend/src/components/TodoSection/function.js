import log from "../../log";

const baseURL = "http://localhost:3050";

export async function addTodo(newTodo) {
  const URL = baseURL + "/allTodos";
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ title: newTodo }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  const allTodos = await data.getTodos;
  log("data Called", "yellow","black");
  return allTodos;
}

export async function fetchTodos({ route }) {
  const response = await fetch(`http://localhost:3050/${route}`);
  const data = await response.json();
  console.log("DATA from fetch todos", data);
  return data.getTodos;
}

export async function shiftTodo({ fromRoute, toRoute, id }) {
  if (toRoute) {
    const response = await fetch(`${baseURL}/${fromRoute}/${toRoute}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Data.getTodos here",data)
    return data.getTodos;
  } else {
    const response = await fetch(`${baseURL}/${fromRoute}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.getTodos;
  }
}

// export function fetchTodos({ route }) {
//   fetch(`http://localhost:3050/${route}`)
//     .then((response) => response.json())
//     .then((data) =>{
//       console.log("Data from function",data)
//      return data.getTodos} );
// }
