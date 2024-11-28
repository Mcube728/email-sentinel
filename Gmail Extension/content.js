// Function to extract all links from the body of an opened Gmail email
function extractLinksFromEmail() {
  // Gmail's email body is dynamically loaded, so we target it using class names
  const emailBody = document.querySelector("div[role='listitem'] div[dir='ltr']");
  
  if (!emailBody) {
    console.log("No email body found!");
    return [];
  }
  
  // Extract links
  const links = emailBody.querySelectorAll("a");
  const linkArray = Array.from(links).map(link => link.href);

  // Log and return the links
  console.log("Extracted Links:", linkArray);
  return linkArray;
}

// Observe for email opening
const observer = new MutationObserver(() => {
  const links = extractLinksFromEmail();
  if (links.length > 0) {
    // Send extracted links to the background script
    chrome.runtime.sendMessage({ type: "EMAIL_LINKS", links });
  }
});

// Start observing Gmail's DOM
observer.observe(document.body, { childList: true, subtree: true });
