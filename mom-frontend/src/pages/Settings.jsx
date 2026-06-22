import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SettingsForm from "../components/SettingsForm";
import ToggleSwitch from "../components/ToggleSwitch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {

  const [capture, setCapture] = useState(true);
  const [transcript, setTranscript] = useState(true);
  const navigate = useNavigate();

  const username =
  localStorage.getItem("username") || "";

const email =
  localStorage.getItem("email") || "";

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <div className="flex justify-between items-center">

  <h1 className="text-5xl font-bold">
    Settings
  </h1>

  <button
    onClick={() => {

      localStorage.removeItem(
        "username"
      );

      localStorage.removeItem(
        "email"
      );

      navigate("/");

    }}
    className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
  >
    Logout
  </button>

</div>

          <div className="bg-white p-8 rounded-3xl mt-8">

            <h2 className="text-2xl font-bold">
              Profile
            </h2>

            <p className="mt-4">
              Username:
              <span className="font-semibold ml-2">
                {username}
              </span>
            </p>

            <p className="mt-2">
              Email:
              <span className="font-semibold ml-2">
                {email}
              </span>
            </p>

          </div>

          <SettingsForm />

          <div className="bg-white p-8 rounded-3xl mt-10">

            <div className="flex justify-between items-center border-b pb-6">

              <div>

                <h2 className="font-bold">
                  Auto Capture Meetings
                </h2>

                <p className="text-gray-500">
                  Start recording automatically
                </p>

              </div>

              <ToggleSwitch
                enabled={capture}
                setEnabled={setCapture}
              />

            </div>

            <div className="flex justify-between items-center pt-6">

              <div>

                <h2 className="font-bold">
                  Tanglish Transcription
                </h2>

                <p className="text-gray-500">
                  Process Tamil-English speech
                </p>

              </div>

              <ToggleSwitch
                enabled={transcript}
                setEnabled={setTranscript}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;