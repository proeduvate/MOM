// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log("MoM Recorder Extension Installed");
});

chrome.runtime.onStartup.addListener(() => {
    console.log("MoM Recorder Started");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received:", message);
});