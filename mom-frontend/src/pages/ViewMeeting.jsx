import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import SummaryCard from "../components/SummaryCard";
import TranscriptViewer from "../components/TranscriptViewer";

function ViewMeeting() {

  const { id } =
    useParams();

  const [summary, setSummary] =
    useState(null);

  const [meetingStatus, setMeetingStatus] =
    useState("Recording");

  const [uploadedFileName, setUploadedFileName] =
    useState("");

  useEffect(() => {

    setSummary({
      title: "Demo Meeting",

      summary:
        "This is a test summary generated from the meeting recording.",

      transcript:
        "Meeting transcript appears here. Backend transcription will be displayed in this section.",

      decisions: [
        "Launch next week",
        "Review dashboard design"
      ],

      action_items: [
        {
          task: "Deploy frontend",
          owner: "Purushothaman",
          deadline: "Jun 15"
        },
        {
          task: "Connect backend APIs",
          owner: "Backend Team",
          deadline: "Jun 18"
        }
      ]
    });

  }, [id]);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setMeetingStatus(
          localStorage.getItem(
            "meeting_status"
          ) || "Stopped"
        );

        setUploadedFileName(
          localStorage.getItem(
            "uploaded_file"
          ) || ""
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, []);

  const generateSummary = () => {

    alert(
      "AI Summary Generating."
    );

  };

  if (!summary) {

    return (

      <div className="flex items-center justify-center min-h-screen">

        <h1 className="text-2xl font-semibold">
          Loading Meeting...
        </h1>

      </div>

    );

  }

  return (

    <div className="flex bg-[#edf4f1] min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-10">

          {/* Meeting Title */}

          <h1 className="text-5xl font-bold">

            {summary.title}

          </h1>

          {/* Meeting Status */}

          <div className="bg-white rounded-3xl p-6 mt-8">

            <h2 className="text-2xl font-bold">
              Meeting Status
            </h2>

            <p className="mt-4">

              Status:

              <span
                className={
                  meetingStatus === "Recording"
                    ? "text-green-600 font-bold ml-2"
                    : "text-red-500 font-bold ml-2"
                }
              >

                {meetingStatus}

              </span>

            </p>

            {uploadedFileName && (

              <p className="mt-4 text-gray-600">

                Uploaded Audio:

                <span className="font-semibold ml-2">

                  {uploadedFileName}

                </span>

              </p>

            )}

          </div>

          {/* Generate Summary */}

          <div className="mt-6 mb-6">

            <button
              onClick={generateSummary}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl"
            >

              Generate AI Summary

            </button>

          </div>

          {/* Summary + Decisions */}

          <div className="grid grid-cols-2 gap-6 mt-6">

            <SummaryCard
              title="Summary"
              content={summary.summary}
            />

            <SummaryCard
              title="Decisions"
              content={
                summary.decisions?.join(", ")
              }
            />

          </div>

          {/* Transcript */}

          <div className="mt-10">

            <TranscriptViewer
              transcript={
                summary.transcript
              }
            />

          </div>

          {/* Action Items */}

          <div className="bg-white rounded-3xl p-6 mt-10">

            <h2 className="text-2xl font-bold mb-4">

              Action Items

            </h2>

            {summary.action_items?.map(
              (item, index) => (

                <div
                  key={index}
                  className="border-b py-4"
                >

                  <p className="font-medium">
                    {item.task}
                  </p>

                  <p className="text-gray-500">
                    {item.owner}
                  </p>

                  <p className="text-gray-500">
                    {item.deadline}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default ViewMeeting;