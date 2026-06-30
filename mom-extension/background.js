let offscreenCreated = false;

// 1. This listens to messages from your Extension Popup (popup.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'background') return;

  if (message.action === 'START_RECORDING') {
    startRecordingSequence(sendResponse);
    return true; 
  }

  if (message.action === 'STOP_RECORDING') {
    stopRecordingSequence(sendResponse);
    return true;
  }
});

// 2. This listens to messages from Purushothaman's External Web App Frontend
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log("Received message from external frontend web application:", message);

  if (message.action === 'START_RECORDING') {
    startRecordingSequence(sendResponse);
    return true; // Keep channel open for async response
  }

  if (message.action === 'STOP_RECORDING') {
    stopRecordingSequence(sendResponse);
    return true; 
  }
});

// --- CORE PIPELINE LOGIC FUNCTIONS ---

async function startRecordingSequence(sendResponse) {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab) {
      sendResponse({ error: "No active tab found." });
      return;
    }

    chrome.tabCapture.getMediaStreamId({ targetTabId: tab.id }, async (streamId) => {
      if (chrome.runtime.lastError) {
        sendResponse({ error: chrome.runtime.lastError.message });
        return;
      }

      if (!offscreenCreated) {
        try {
          await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['USER_MEDIA'],
            justification: 'Recording tab audio'
          });
          offscreenCreated = true;
        } catch (e) {
          offscreenCreated = true;
        }
      }

      setTimeout(() => {
        chrome.runtime.sendMessage({
          target: 'offscreen',
          action: 'INIT_RECORDING',
          streamId: streamId
        });
        sendResponse({ success: true });
      }, 200);
    });

  } catch (err) {
    sendResponse({ error: err.message || "Failed to start capture." });
  }
}

async function stopRecordingSequence(sendResponse) {
  try {
    chrome.runtime.sendMessage({ target: 'offscreen', action: 'FINALIZE_RECORDING' }, async (response) => {
      if (offscreenCreated) {
        try { await chrome.offscreen.closeDocument(); } catch(e) {}
        offscreenCreated = false;
      }
      sendResponse(response || { success: true });
    });
  } catch (err) {
    if (offscreenCreated) {
      try { await chrome.offscreen.closeDocument(); } catch(e) {}
    }
    offscreenCreated = false;
    sendResponse({ error: err.message });
  }
}