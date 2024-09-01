import { useEffect, useState } from "react";

import avtar from "../../assets/man.png";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const classNameText = "text-center p-2 rounded-md w-[400px]";
  const classNameButton =
    "bg-gradient-to-r from-gray-500 to-slate-300 mt-2 px-5 py-1 rounded-lg text-white";
  const [user, setUser] = useState({
    name: "",
    password: "",
    passwordCheck: "",
    passwordCheckFailed: false,
  });
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("from Signup.jsx");
    if (login) {
      navigate("/user/data");
    }
    console.log("from Signup.jsx");
  }, [login]);

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
  function handleOnCheckPassword(event) {
    setUser((prevState) => {
      return { ...prevState, passwordCheck: event.target.value };
    });
  }

  async function newUser() {
    if (user.password !== user.passwordCheck) {
      setUser((prevState) => {
        return { ...prevState, passwordCheckFailed: true };
      });
    } else {
      setUser((prevState) => {
        return { ...prevState, passwordCheckFailed: false };
      });
      try {
        const response = await fetch("http://localhost:3050/newuser", {
          method: "post",
          body: JSON.stringify({ name: user.name, password: user.password }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", `${data.token}`);

        navigate("/user/login");
      } catch (error) {
        console.log(error);
      }
    }
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
        <input
          className={classNameText}
          type="text"
          placeholder="Re-enter password"
          value={user.passwordCheck}
          onChange={handleOnCheckPassword}
        />
        {user.passwordCheckFailed && <p>Password not match</p>}
        <button className={classNameButton} onClick={newUser}>
          Sign up
        </button>
      </div>
    </div>
  );
}




{
  /* <input
          className={classNameText}
          type="text"
          placeholder="Re-enter password"
        /> */
}

// async function newUser() {
//   try {
//     const response = await fetch("http://localhost:3050/newuser", {
//       method: "POST",
//       body: JSON.stringify({ name: user.name, password: user.password }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
