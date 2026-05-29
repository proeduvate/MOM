import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SettingsForm from "../components/SettingsForm";
import ToggleSwitch from "../components/ToggleSwitch";

import { useState } from "react";

function Settings() {

  const [capture, setCapture] = useState(true);
  const [transcript, setTranscript] = useState(true);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h1 className="text-5xl font-bold">
            Settings
          </h1>

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