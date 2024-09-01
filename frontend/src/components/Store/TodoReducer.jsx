const initialState = { status: "allTodos", todos: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "SET_TODOS":
      return { ...state, todos: action.todos };
  }
}
export {initialState,reducer}

