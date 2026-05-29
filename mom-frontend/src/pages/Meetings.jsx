import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useState, useEffect } from "react";

function Meetings() {

  const defaultMeetings = [
    {
      id: 1,
      title: "Q3 Product Roadmap Sync",
      duration: "48 min",
      date: "2026-05-11",
      platform: "Google Meet",
      status: "Processed",
    },
    {
      id: 2,
      title: "Customer Discovery — Acme Corp",
      duration: "32 min",
      date: "2026-05-10",
      platform: "Zoom",
      status: "Processed",
    },
    {
      id: 3,
      title: "Weekly Engineering Standup",
      duration: "22 min",
      date: "2026-05-09",
      platform: "Teams",
      status: "Processing",
    },
  ];

  const [meetings, setMeetings] = useState(() => {

    const saved =
      localStorage.getItem("meetings");

    return saved
      ? JSON.parse(saved)
      : defaultMeetings;
  });

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [date, setDate] =
    useState("");

  const [platform, setPlatform] =
    useState("Google Meet");

  const [status, setStatus] =
    useState("Processed");

  const [duration, setDuration] =
    useState("");

  useEffect(() => {

    localStorage.setItem(
      "meetings",
      JSON.stringify(meetings)
    );

  }, [meetings]);

  // FORMAT DATE

  const formatDate = (date) => {

    const options = {
      month: "short",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString(
      "en-US",
      options
    );
  };

  // ADD / SAVE

  const saveMeeting = () => {

    if (!title.trim()) return;

    const meeting = {
      id: editId || Date.now(),
      title,
      duration,
      date,
      platform,
      status,
    };

    if (editId) {

      setMeetings(
        meetings.map((m) =>
          m.id === editId ? meeting : m
        )
      );

    } else {

      setMeetings([
        ...meetings,
        meeting,
      ]);
    }

    closeModal();
  };

  // EDIT

  const editMeeting = (meeting) => {

    setEditId(meeting.id);

    setTitle(meeting.title);

    setDuration(meeting.duration);

    setDate(meeting.date);

    setPlatform(meeting.platform);

    setStatus(meeting.status);

    setShowModal(true);
  };

  // DELETE

  const deleteMeeting = (id) => {

    setMeetings(
      meetings.filter(
        (meeting) => meeting.id !== id
      )
    );
  };

  // CLOSE MODAL

  const closeModal = () => {

    setShowModal(false);

    setEditId(null);

    setTitle("");

    setDuration("");

    setDate("");

    setPlatform("Google Meet");

    setStatus("Processed");
  };

  // FILTER

  const filteredMeetings =
    meetings.filter((meeting) => {

      const matchesFilter =
        filter === "All"
          ? true
          : meeting.status === filter;

      const matchesSearch =
        meeting.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });

  return (
    <div className="flex bg-[#edf4f1] min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-10">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold">
                Meetings
              </h1>

              <p className="text-gray-500 mt-2">
                Every meeting captured by MinutesAI
              </p>

            </div>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-green-600 text-white px-7 py-4 rounded-2xl hover:bg-green-700 transition"
            >
              + New Meeting
            </button>

          </div>

          {/* SEARCH + FILTER */}

          <div className="flex gap-5 mt-10">

            <input
              type="text"
              placeholder="Search meetings"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border border-gray-200 p-4 rounded-2xl w-[500px] bg-white outline-none"
            />

            <div className="flex gap-3 bg-white p-2 rounded-full">

              {[
                "All",
                "Processed",
                "Processing",
                "Draft",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    setFilter(item)
                  }
                  className={
                    filter === item
                      ? "bg-green-600 text-white px-5 py-2 rounded-full"
                      : "px-5 py-2 rounded-full"
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* TABLE */}

          <div className="bg-white rounded-3xl mt-10 overflow-hidden shadow-sm">

            {/* HEADER */}

            <div className="grid grid-cols-6 p-6 text-gray-500 border-b font-medium">

              <p>MEETING</p>
              <p>DATE</p>
              <p>PLATFORM</p>
              <p>STATUS</p>
              <p>ACTION</p>
              <p>MANAGE</p>

            </div>

            {/* DATA */}

            {filteredMeetings.map((meeting) => (

              <div
                key={meeting.id}
                className="grid grid-cols-6 items-center p-6 border-b"
              >

                <div>

                  <h2 className="font-semibold text-lg">
                    {meeting.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {meeting.duration}
                  </p>

                </div>

                <p>
                  {formatDate(meeting.date)}
                </p>

                <p>{meeting.platform}</p>

                <div>

                  <span
                    className={
                      meeting.status === "Processed"
                        ? "bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm"
                        : meeting.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm"
                        : "bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm"
                    }
                  >
                    {meeting.status}
                  </span>

                </div>

                <button className="text-green-600 font-medium">
                  Open
                </button>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      editMeeting(meeting)
                    }
                    className="border px-4 py-2 rounded-xl text-sm hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteMeeting(meeting.id)
                    }
                    className="border border-red-300 text-red-500 px-4 py-2 rounded-xl text-sm hover:bg-red-50"
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

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-3xl w-[500px] shadow-xl">

            <h2 className="text-2xl font-semibold mb-6">

              {editId
                ? "Edit Meeting"
                : "Add Meeting"}

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Meeting Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border p-4 rounded-xl outline-none"
              />

              <input
                type="text"
                placeholder="Duration (48 min)"
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                className="w-full border p-4 rounded-xl outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full border p-4 rounded-xl outline-none"
              />

              <select
                value={platform}
                onChange={(e) =>
                  setPlatform(e.target.value)
                }
                className="w-full border p-4 rounded-xl outline-none"
              >

                <option>
                  Google Meet
                </option>

                <option>
                  Zoom
                </option>

                <option>
                  Teams
                </option>

              </select>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full border p-4 rounded-xl outline-none"
              >

                <option>
                  Processed
                </option>

                <option>
                  Processing
                </option>

                <option>
                  Draft
                </option>

              </select>

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={saveMeeting}
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

export default Meetings;