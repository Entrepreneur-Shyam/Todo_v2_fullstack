import {  useEffect, useState } from "react";
import avtar from "../../assets/man.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const classNameText = "text-center p-2 rounded-md w-[400px]";
  const classNameButton =
    "bg-gradient-to-r  from-gray-500 to-slate-300 mt-2 px-5 py-1 rounded-lg text-white";
  const [user, setUser] = useState({
    name: "",
    password: "",
    errormessage: "",
  });

  const login = localStorage.getItem("login");

  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      navigate("/user/data");

      console.log("From LoginPage.jsx");
    }
    console.log("From LoginPage.jsx");
  }, [login, navigate]);

  function handleOnChangeName(event) {
    setUser((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  }
  function handleOnChangePassword(event) {
    setUser((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  }

  async function verifyUser() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3050/login", {
      method: "post",
      body: JSON.stringify({ name: user.name, password: user.password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.invalidmessage) {
      setUser((prevState) => {
        return { ...prevState, errormessage: data.invalidmessage };
      });
    } else {
      setUser((prevState) => {
        return { ...prevState, errormessage: data.message };
      });

      localStorage.setItem("login", `${user.name.toUpperCase()}`);
      navigate("/user/data/allTodos");
    }
    console.log(data);
  }

  return (
    <div className="w-full bg-slate-400 h-screen flex items-center - justify-center gap-16">
      <img className="w-[200px]" src={avtar} alt="" />
      <div className="flex flex-col gap-5 items-start ">
        <input
          className={classNameText}
          type="text"
          placeholder="Enter username"
          value={user.name}
          onChange={handleOnChangeName}
        />
        <input
          className={classNameText}
          type="text"
          placeholder="Enter password"
          value={user.password}
          onChange={handleOnChangePassword}
        />
        <p>{user.errormessage}</p>
        <button className={classNameButton} onClick={verifyUser}>
          Login
        </button>
      </div>
    </div>
  );
}
