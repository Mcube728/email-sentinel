// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EMAIL_LINKS") {
    console.log("Links extracted from email:", message.links);
    // Do something with the links (e.g., display them in the extension's popup)
  }
});
