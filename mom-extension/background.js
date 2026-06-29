chrome.runtime.onInstalled.addListener(() => {
    console.log("MoM Extension Installed");
});

chrome.runtime.onStartup.addListener(() => {
    console.log("MoM Extension Started");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log("Message received:", message);

    if (message.action === "start-recording") {
        console.log("Start recording requested");
    }

    if (message.action === "stop-recording") {
        console.log("Stop recording requested");
    }

    sendResponse({ success: true });

    return true;
});