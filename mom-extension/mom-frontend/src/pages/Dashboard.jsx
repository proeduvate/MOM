import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

import { stats, meetings} from "../data/mockData";


function Dashboard() {

  const navigate = useNavigate();
  const savedTasks =
    JSON.parse(localStorage.getItem("tasks")) || [];
    const displayName =
  (localStorage.getItem("username") || "")
    .split("@")[0];

  return (
    <div className="flex min-h-screen bg-[#edf4f1]">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold">
                Welcome back, {displayName}
              </h1>

              <p className="text-gray-500 mt-2">
                Here's what's happened across your meetings.
              </p>

            </div>

            <button
               onClick={() => navigate("/meetings")}
               className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition"
                >
               + New Meeting
               </button>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-4 gap-6 mt-10">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm"
              >

                <h3 className="text-gray-500">
                  {item.title}
                </h3>

                <h1 className="text-5xl font-bold mt-5">
                  {item.value}
                </h1>

              </div>

            ))}

          </div>

          {/* CONTENT */}

          <div className="grid grid-cols-3 gap-6 mt-10">

            {/* RECENT MEETINGS */}

            <div className="col-span-2 bg-white rounded-3xl p-6 shadow-sm">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Recent Meetings
                </h2>

                <button
                onClick={() => navigate("/meetings")}
                className="text-green-600 font-semibold"
                >
                View all
                </button>

              </div>

              {meetings.map((meeting) => (

                <div
                  key={meeting.id}
                  className="flex justify-between items-center border-b py-5"
                >

                  <div>

                    <h3 className="font-bold text-lg">
                      {meeting.title}
                    </h3>

                    <p className="text-gray-500">
                      {meeting.date} • {meeting.platform}
                    </p>

                  </div>

                  <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                    {meeting.status}
                  </span>

                </div>

              ))}

            </div>

            {/* TASKS */}

            <div className="bg-white rounded-3xl p-6 shadow-sm">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Your Tasks
                </h2>

                <button
                onClick={() => navigate("/tasks")}
                className="text-green-600 font-semibold"
                >
                All
                </button>

              </div>

              {savedTasks.map((task) => (

                <div
                  key={task.id}
                  className="flex items-start gap-4 mb-6"
                >

                  <input
                    type="checkbox"
                    checked={task.done}
                    readOnly
                    className="mt-1"
                  />

                  <div>

                    <h3
                      className={
                        task.done
                          ? "line-through text-gray-400"
                          : "font-medium"
                      }
                    >
                      {task.task}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {task.user} • due {task.due}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;