console.log("Chrome:", chrome);
console.log("tabCapture:", chrome.tabCapture);

document.addEventListener(
  "DOMContentLoaded",
  () => {

    let stream = null;
    let recorder = null;
    let audioChunks = [];
    let recording = false;

    const startBtn =
      document.getElementById(
        "startBtn"
      );

    const uploadBtn =
      document.getElementById(
        "uploadBtn"
      );

    const status =
      document.getElementById(
        "status"
      );

    startBtn.addEventListener(
      "click",
      async () => {

        try {

          // START RECORDING

          if (!recording) {

            status.innerText =
              "Recording Meeting...";

            startBtn.innerText =
              "Stop Recording";

            startBtn.style.background =
              "#ef4444";

            recording = true;

            localStorage.setItem(
              "meeting_status",
              "Recording"
            );

            // Keep this for full-stack integration

            if (
              chrome.tabCapture &&
              chrome.tabCapture.capture
            ) {

              chrome.tabCapture.capture(
                {
                  audio: true,
                  video: false,
                },

                (capturedStream) => {

                  if (!capturedStream) {

                    console.error(
                      chrome.runtime.lastError
                    );

                    return;
                  }

                  stream =
                    capturedStream;

                  audioChunks = [];

                  recorder =
                    new MediaRecorder(
                      stream
                    );

                  recorder.ondataavailable =
                    (event) => {

                      if (
                        event.data.size > 0
                      ) {

                        audioChunks.push(
                          event.data
                        );

                      }

                    };

                  recorder.onstop =
                    () => {

                      const blob =
                        new Blob(
                          audioChunks,
                          {
                            type:
                              "audio/webm",
                          }
                        );

                      console.log(
                        "Recording Complete",
                        blob
                      );

                      localStorage.setItem(
                        "uploaded_file",
                        "meeting.webm"
                      );

                    };

                  recorder.start(
                    1000
                  );

                }
              );

            }

          }

          // STOP RECORDING

          else {

            recording = false;

            status.innerText =
              "Meeting Stopped";

            startBtn.innerText =
              "Start Recording";

            startBtn.style.background =
              "#22c55e";

            localStorage.setItem(
              "meeting_status",
              "Stopped"
            );

            if (recorder) {

              recorder.stop();

            }

            if (stream) {

              stream
                .getTracks()
                .forEach(
                  (track) =>
                    track.stop()
                );

            }

          }

        } catch (err) {
    console.error("Recording Error:", err.name);
    console.error("Message:", err.message);
    console.error(err);

    status.textContent = "Status : Unable to record";
}

        }

      }
    );

    uploadBtn.addEventListener(
      "click",
      async () => {

        if (
          audioChunks.length === 0
        ) {

          alert(
            "No recording found"
          );

          return;

        }

        status.innerText =
          "Sending To Backend...";

        const blob =
          new Blob(
            audioChunks,
            {
              type:
                "audio/webm",
            }
          );

        console.log(
          "Blob Ready:",
          blob
        );

        // Full-stack team can replace this
        // with actual API call

        setTimeout(() => {

          status.innerText =
            "Backend Received Audio";

          localStorage.setItem(
            "uploaded_file",
            "meeting.webm"
          );

        }, 2000);

      }
    );

  });