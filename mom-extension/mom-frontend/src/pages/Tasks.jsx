import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useState, useEffect } from "react";

function Tasks() {

  const defaultTasks = [
    {
      id: 1,
      task: "Finalize mobile QA checklist",
      user: "Priya S.",
      due: "2026-05-18",
      done: false,
    },
    {
      id: 2,
      task: "Draft billing migration plan",
      user: "Karthik V.",
      due: "2026-05-22",
      done: true,
    },
  ];

  const [tasks, setTasks] = useState(() => {

    const saved = localStorage.getItem("tasks");

    return saved
      ? JSON.parse(saved)
      : defaultTasks;
  });

  const [filter, setFilter] = useState("all");

  const [newTask, setNewTask] = useState("");

  const [dueDate, setDueDate] = useState("");

  // MODAL STATES

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [currentTaskId, setCurrentTaskId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const [editTaskDate, setEditTaskDate] =
    useState("");

  // SAVE TO LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);

  // FORMAT DATE

  const formatDate = (date) => {

    if (!date || date === "No Date")
      return "No Date";

    const options = {
      month: "short",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString(
      "en-US",
      options
    );
  };

  // TOGGLE TASK

  const toggleTask = (id) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // ADD TASK

  const addTask = () => {

    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      task: newTask,
      user: "You",
      due: dueDate || "No Date",
      done: false,
    };

    setTasks([...tasks, task]);

    setNewTask("");

    setDueDate("");
  };

  // DELETE TASK

  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  // OPEN MODAL

  const openEditModal = (task) => {

    setCurrentTaskId(task.id);

    setEditText(task.task);

    setEditTaskDate(task.due);

    setShowEditModal(true);
  };

  // SAVE EDIT

  const saveEdit = () => {

    setTasks(
      tasks.map((task) =>
        task.id === currentTaskId
          ? {
              ...task,
              task: editText,
              due: editTaskDate,
            }
          : task
      )
    );

    setShowEditModal(false);
  };

  // FILTERS

  const filteredTasks = tasks.filter((task) => {

    if (filter === "open") return !task.done;

    if (filter === "done") return task.done;

    return true;
  });

  return (
    <div className="flex bg-[#edf4f1] min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-10">

          {/* HEADER */}

          <div>

            <h1 className="text-5xl font-bold">
              Tasks
            </h1>

            <p className="text-gray-500 mt-2">
              Auto-extracted from meetings
            </p>

          </div>

          {/* ADD TASK */}

          <div className="flex gap-4 mt-10 items-center">

            <input
              type="text"
              value={newTask}
              onChange={(e) =>
                setNewTask(e.target.value)
              }
              placeholder="Enter new task..."
              className="border border-gray-200 p-4 rounded-2xl w-96 bg-white outline-none"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="border border-gray-200 p-4 rounded-2xl bg-white outline-none"
            />

            <button
              onClick={addTask}
              className="bg-green-600 text-white px-6 py-4 rounded-2xl hover:bg-green-700 transition"
            >
              + Add Task
            </button>

          </div>

          {/* FILTERS */}

          <div className="flex gap-4 mt-10">

            <button
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-green-600 text-white px-6 py-3 rounded-full"
                  : "bg-white px-6 py-3 rounded-full"
              }
            >
              All
            </button>

            <button
              onClick={() => setFilter("open")}
              className={
                filter === "open"
                  ? "bg-green-600 text-white px-6 py-3 rounded-full"
                  : "bg-white px-6 py-3 rounded-full"
              }
            >
              Open
            </button>

            <button
              onClick={() => setFilter("done")}
              className={
                filter === "done"
                  ? "bg-green-600 text-white px-6 py-3 rounded-full"
                  : "bg-white px-6 py-3 rounded-full"
              }
            >
              Done
            </button>

          </div>

          {/* TASK LIST */}

          <div className="bg-white rounded-3xl mt-10 overflow-hidden shadow-sm">

            {filteredTasks.map((task) => (

              <div
                key={task.id}
                className="flex justify-between items-center p-6 border-b"
              >

                {/* LEFT */}

                <div className="flex gap-5 items-start">

                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="mt-2"
                  />

                  <div>

                    <h2
                      className={
                        task.done
                          ? "line-through text-gray-400 font-semibold text-lg"
                          : "font-semibold text-lg"
                      }
                    >
                      {task.task}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {task.user} • due {formatDate(task.due)}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="flex gap-3">

                  <button
                    onClick={() => openEditModal(task)}
                    className="border border-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="border border-red-300 text-red-500 px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* MODAL */}

      {showEditModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-3xl w-[420px] shadow-xl">

            <h2 className="text-2xl font-semibold mb-6">
              Edit Task
            </h2>

            <input
              type="text"
              value={editText}
              onChange={(e) =>
                setEditText(e.target.value)
              }
              className="w-full border p-4 rounded-xl mb-5 outline-none"
            />

            <input
              type="date"
              value={editTaskDate}
              onChange={(e) =>
                setEditTaskDate(e.target.value)
              }
              className="w-full border p-4 rounded-xl outline-none"
            />

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="px-5 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-5 py-2 rounded-xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tasks;