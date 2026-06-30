console.log("MoM Offscreen Document Loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log("Message received:", message);

    if (message.type === "START_RECORDING") {
        console.log("Recording will start...");
    }

    if (message.type === "STOP_RECORDING") {
        console.log("Recording will stop...");
    }

    sendResponse({ success: true });

    return true;
});