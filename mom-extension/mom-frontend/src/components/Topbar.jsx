import { FaBell } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Topbar() {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex justify-between items-center p-5 bg-[#edf4f1]">

      <input
        type="text"
        placeholder="Search meetings, tasks..."
        className="w-[500px] p-3 rounded-full border"
      />

      <div className="flex items-center gap-5">

        <FaBell size={20} />

        <div
       onClick={() => navigate("/settings")}
      className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition"
       >
       {initials}
      </div>

      </div>

    </div>
  );
}

export default Topbar;