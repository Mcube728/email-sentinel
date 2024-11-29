// Fetch and display links in the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EMAIL_LINKS") {
    const linksList = document.getElementById("linksList");
    linksList.innerHTML = "";
    message.links.forEach(link => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.textContent = link;
      anchor.target = "_blank";
      listItem.appendChild(anchor);
      linksList.appendChild(listItem);
    });
  }
});
