import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Extension() {

  return (

    <div className="flex min-h-screen bg-[#edf4f1]">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-10">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

            Chrome Extension • v1.4

          </span>

          <h1 className="text-6xl font-bold mt-6">

            Capture every meeting,
            in any language.

          </h1>

          <p className="text-gray-500 mt-6 text-xl max-w-3xl">

            Install the MoM browser extension
            to automatically record,
            transcribe and structure
            every meeting.

          </p>

          <div className="flex gap-4 mt-8">

            <button
              className="bg-green-600 text-white px-8 py-4 rounded-2xl"
            >
              Add to Chrome
            </button>

            <button
              className="bg-white px-8 py-4 rounded-2xl border"
            >
              Download ZIP
            </button>

          </div>
          <div className="mt-6">

  <button
    onClick={async () => {

      try {

        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        alert("Microphone Working");

      } catch (err) {

        console.error(err);

        alert(err.message);

      }

    }}
    className="bg-blue-600 text-white px-6 py-3 rounded-xl"
  >
    Test Microphone
  </button>

</div>

          <div className="grid grid-cols-4 gap-6 mt-12">

            <div className="bg-white p-6 rounded-3xl">

              <h2 className="font-bold text-xl">

                Live Capture

              </h2>

              <p className="text-gray-500 mt-3">

                Record audio from
                Google Meet,
                Zoom and Teams.

              </p>

            </div>

            <div className="bg-white p-6 rounded-3xl">

              <h2 className="font-bold text-xl">

                Multilingual

              </h2>

              <p className="text-gray-500 mt-3">

                English,
                Tamil,
                Tanglish support.

              </p>

            </div>

            <div className="bg-white p-6 rounded-3xl">

              <h2 className="font-bold text-xl">

                OCR Detection

              </h2>

              <p className="text-gray-500 mt-3">

                Detect meeting
                participants
                automatically.

              </p>

            </div>

            <div className="bg-white p-6 rounded-3xl">

              <h2 className="font-bold text-xl">

                AI Extraction

              </h2>

              <p className="text-gray-500 mt-3">

                Auto-generate
                summaries,
                action items
                and decisions.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Extension;