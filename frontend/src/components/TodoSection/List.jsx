import { useOutletContext } from "react-router-dom";


export default function List() {
  const {
    todos,
    activeStatus,
    allTodosToCompletedTodos,
    allTodosToFailedTodos,
    deleteTodos,
    completedTodosToFailedTodos,
    completedTodoReset,
    failedTodosToCompletedTodos,
    failedTodoReset,
  } = useOutletContext();

  console.log("List render",todos);

  return (
    <div className="mt-4 w-full text-center ">


      {todos.length===0 ? <p>Empty List</p>:   <ul>
        {todos.map((el) => {
          return (
            <li
              className="flex justify-between mb-3 bg-slate-200 px-5  transition-all duration-1000 hover:bg-slate-400 "
              key={el._id}
            >
              {el.title}

              <span className="flex gap-5">
                {activeStatus === "allTodos" && (
                  <>
                    <button
                      onClick={() => allTodosToCompletedTodos(el._id)}
                      className="bg-green-400 px-2 rounded-sm"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => {
                        allTodosToFailedTodos(el._id);
                      }}
                      className="bg-red-500"
                    >
                      Failed
                    </button>
                    <button 
                      onClick={() => deleteTodos(el._id)}
                      className="bg-red-200 click"
                    >
                      Deleted
                    </button>
                  </>
                )}
                {activeStatus === "completedTodos" && (
                  <>
                    <button
                      onClick={() => completedTodosToFailedTodos(el._id)}
                      className="bg-red-500"
                    >
                      Failed
                    </button>
                    <button
                      onClick={() => completedTodoReset(el._id)}
                      className="bg-gray-400 px-2 rounded-sm"
                    >
                      Reset
                    </button>
                  </>
                )}
                {activeStatus === "failedTodos" && (
                  <>
                    <button
                      onClick={() => {
                        failedTodosToCompletedTodos(el._id);
                      }}
                      className="bg-green-500"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => failedTodoReset(el._id)}
                      className="bg-gray-400 px-2 rounded-sm"
                    >
                      Reset
                    </button>
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>  }
     
    </div>
  );
}

