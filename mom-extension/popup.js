const startBtn = document.getElementById('startBtn') || document.getElementById('start');
const stopBtn = document.getElementById('stopBtn') || document.getElementById('stop');
const statusDiv = document.getElementById('status');

startBtn.addEventListener('click', async () => {
  statusDiv.innerText = "Starting...";
  
  chrome.runtime.sendMessage({ target: 'background', action: 'START_RECORDING' }, (response) => {
    if (chrome.runtime.lastError) {
      statusDiv.innerText = `Error: ${chrome.runtime.lastError.message}`;
      return;
    }
    
    if (response && response.error) {
      statusDiv.innerText = `Error: ${response.error}`;
    } else if (response && response.success) {
      startBtn.disabled = true;
      if (stopBtn) stopBtn.disabled = false;
      statusDiv.innerText = "Recording tab audio...";
    } else {
      statusDiv.innerText = "Failed to start.";
    }
  });
});

stopBtn.addEventListener('click', () => {
  statusDiv.innerText = "Stopping & Uploading...";
  
  chrome.runtime.sendMessage({ target: 'background', action: 'STOP_RECORDING' }, (response) => {
    if (chrome.runtime.lastError) {
      statusDiv.innerText = `Error: ${chrome.runtime.lastError.message}`;
      return;
    }

    if (response && response.success) {
      startBtn.disabled = false;
      if (stopBtn) stopBtn.disabled = true;
      statusDiv.innerText = "Upload Complete!";
    } else {
      statusDiv.innerText = response?.error || "Error stopping capture.";
      startBtn.disabled = false;
      if (stopBtn) stopBtn.disabled = true;
    }
  });
});