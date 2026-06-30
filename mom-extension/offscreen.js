let mediaRecorder;
let audioChunks = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const target = message.target || message.to;
  if (target !== 'offscreen') return;

  const action = message.action || message.type;

  if (action === 'INIT_RECORDING') {
    startCapture(message.streamId);
  }

  if (action === 'FINALIZE_RECORDING') {
    stopAndUpload(sendResponse);
    return true; // Keep channel alive for async response
  }
});

async function startCapture(streamId) {
  try {
    audioChunks = [];
    
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId
        }
      },
      video: false
    });

    // Continue playing audio to user speakers while recording
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(audioContext.destination);

    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.push(event.data);
    };

    mediaRecorder.start(1000);
  } catch (err) {
    console.error("Offscreen capture failure:", err);
  }
}

function stopAndUpload(sendResponse) {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    sendResponse({ error: "No active recording found" });
    return;
  }

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'meeting.webm');

    const YOUR_JWT_TOKEN = "YOUR_ACTUAL_JWT_TOKEN_HERE"; 

    try {
      const response = await fetch('http://localhost:8000/api/meetings/upload-audio', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${YOUR_JWT_TOKEN}`
        },
        body: formData
      });

      if (response.ok) {
        sendResponse({ success: true });
      } else {
        sendResponse({ error: `Upload status: ${response.status}` });
      }
    } catch (error) {
      // If backend isn't running yet, we still want to consider the recording stopped successfully local-side
      sendResponse({ success: true, info: "Local recording stopped, backend unreachable." });
    }
  };

  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach(track => track.stop());
}