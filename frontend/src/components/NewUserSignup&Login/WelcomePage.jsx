import { Link, useNavigate } from "react-router-dom";
import avtar from "../../assets/man.png";
import { useEffect } from "react";

export default function WelcomePage() {
  let className =
    "bg-gradient-to-r from-cyan-500 to-yellow-300 px-5 py-1 rounded-lg text-white";
  const navigate = useNavigate();
  const login = localStorage.getItem("login");
  useEffect(() => {
    if (login) {
      navigate("/user/login");
    }
  }, [login]);

  return (
    <div className="w-full pt-[100px] h-screen bg-slate-500 flex justify-center ">
      <div className="w-1/2 h-fit bg-slate-50 flex flex-col items-center p-5 rounded-md">
        <img className="w-[200px]" src={avtar} alt="" />
        <h1 className="text-2xl font-bold">WELCOME HERE</h1>
        <div className="w-1/2 flex justify-between mt-5">
          <button className={className}>
            <Link to="user/login">LOGIN</Link>
          </button>
          <button className={className}>
            <Link to="user/signup">SIGNUP</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
