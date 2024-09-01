import avtar from "../assets/man.png";
import { Link } from "react-router-dom";
export default function Navbar() {

console.log("Navbar render")

  let value=localStorage.getItem("login")
  return (
    <div className="flex justify-between bg-slate-400 w-[70vw] max-w-[1500px] p-2 rounded-md">
      <div className="flex justify-center gap-5 items-center">
        <img className="w-14 " src={avtar} alt="" />
        <h1 className="text-3xl font-bold">{value?value:"USER"}</h1>
      </div>
      <button className="text-xl font-semibold bg-slate-500 px-4 rounded-md text-white">
        <Link to="/" onClick={()=>{
          localStorage.clear()
        }}>Logout</Link>
        
      </button>
    </div>
  );
}
