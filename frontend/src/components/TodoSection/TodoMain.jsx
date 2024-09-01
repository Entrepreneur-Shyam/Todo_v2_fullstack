import { Link } from "react-router-dom";
import Navbar from "../navbar";

import TodoSection from "../../components/TodoSection";

export default function TodoMain() {
  const login = localStorage.getItem("login");

  return login ? (
    <div className="h-screen pt-3 bg-cyan-200 flex flex-col items-center">
      <Navbar />
      <TodoSection />
    </div>
  ) : (
    <div className="w-full text-center">
      <h1>Need Signup if you are new user otherwise login </h1>
      <div>
        <button>
          <Link to="/user/signup" className="bg-slate-500 mr-5 text-white">
            Sign up
          </Link>
        </button>
        <button>
          <Link to="/user/login" className="bg-orange-300 ">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
