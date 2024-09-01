import {memo} from "react";

import { NavLink } from "react-router-dom";

export default memo(function TodoStatus({
  changedStatusAllTodos,
  changedStatusCompletedTodos,
  changedStatusFailedTodos,
}) {
  let style = "bg-stone-300 rounded-md px-3 py-2";

  console.log("TodoStatus render");

  return (
    <div className="mt-10 flex justify-between px-20 w-full">
      <NavLink className={({isActive})=>{
        return isActive ? "shadow-lg ": ""
      }} to="alltodos">
        <button onClick={changedStatusAllTodos} className={style}>
          All Todos
        </button>
      </NavLink>
      <NavLink className={({isActive})=>{
        return  isActive ? "shadow-lg ": ""
      }} to="completedtodos">
        <button onClick={changedStatusCompletedTodos} className={style}>
          Completed Todos{" "}
        </button>
      </NavLink>
      <NavLink className={({isActive})=>{
        return  isActive ? "shadow-lg ": ""
      }} to="failedtodos">
        <button onClick={changedStatusFailedTodos} className={style}>
          Failed Todos
        </button>
      </NavLink>
    </div>
  );
})


