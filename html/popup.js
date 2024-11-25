let scrapeEmails = document.getElementById('scrapeEmails');

scrapeEmails.addEventListener("click", async () => {
    // get current active tab
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    //execute script to parse emails on page
    chrome.scripting.executeScript({
        target: {tabId: tab.id}, 
        func: scrapeEmailsFromPage,
    });
})