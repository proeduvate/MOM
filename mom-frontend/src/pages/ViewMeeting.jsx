
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

// import {
//   getSummary,
// } from "../services/api";

function ViewMeeting() {

  const { id } =
    useParams();

  const [summary, setSummary] =
    useState(null);
  const [recording, setRecording] = useState(false);

  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {

  setSummary({
    title: "Demo Meeting",

    summary:
      "This is a test summary.",

    transcript:
      "Meeting transcript appears here.",

    decisions: [
      "Launch next week"
    ],

    action_items: [
      {
        task: "Deploy frontend",
        owner: "Purushothaman",
        deadline: "Jun 15"
      }
    ]
  });

}, [id]);
  const startRecording = () => {

  setRecording(true);

  alert("Recording Started");
};

const stopRecording = () => {

  setRecording(false);

  alert("Recording Stopped");
};

const uploadAudio = () => {

  if (!audioFile) {
    alert("Select audio file");
    return;
  }

  alert("Audio Uploaded");
};

const generateSummary = () => {

  alert("Generating AI Summary...");
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

          <h1 className="text-5xl font-bold">

            {summary.title}

          </h1>
          <div className="bg-white rounded-3xl p-6 mt-8">

  <h2 className="text-2xl font-semibold mb-4">
    Meeting Controls
  </h2>
<p className="mb-4 text-gray-500">
  Status:

  <span
    className={
      recording
        ? "text-green-600 font-semibold ml-2"
        : "text-red-500 font-semibold ml-2"
    }
  >
    {recording ? "Recording" : "Stopped"}
  </span>

</p>
  <div className="flex gap-4">

    <button
      onClick={startRecording}
      className="bg-green-600 text-white px-5 py-3 rounded-xl"
    >
      Start Recording
    </button>

    <button
      onClick={stopRecording}
      className="bg-red-500 text-white px-5 py-3 rounded-xl"
    >
      Stop Recording
    </button>

  </div>

</div>
<div className="bg-white rounded-3xl p-6 mt-6">

  <h2 className="text-2xl font-semibold mb-4">
    Upload Audio
  </h2>

  <div className="flex gap-4 items-center">

    <input
      type="file"
      accept=".mp3,.wav,.webm"
      onChange={(e) =>
        setAudioFile(e.target.files[0])
      }
    />
    {audioFile && (

  <p className="text-gray-500">
    Selected: {audioFile.name}
  </p>

)}

    <button
      onClick={uploadAudio}
      className="bg-blue-600 text-white px-5 py-3 rounded-xl"
    >
      Upload
    </button>

  </div>

</div>

          <div className="grid grid-cols-2 gap-6 mt-10">
<div className="mt-6 mb-6">

  <button
    onClick={generateSummary}
    className="bg-purple-600 text-white px-6 py-3 rounded-xl"
  >
    Generate AI Summary
  </button>

</div>

<div className="grid grid-cols-2 gap-6 mt-6">

</div>
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

          <div className="mt-10">

            <TranscriptViewer
              transcript={
                summary.transcript
              }
            />

          </div>

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

                  <p>
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