let scrapeEmails = document.getElementById('scrapeEmails');
let list = document.getElementById('emailList');

//handler to receive mails from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    //get emails
    let emails = request.emails;
    
    //display emails on popup
    if(emails == null || emails.length == 0){
        let li = document.createElement('li')
        li.innerText = "No Emails found";
        list.appendChild(li);
    } else {
        emails.forEach((email)=> {
            let li = document.createElement('li')
            li.innerText = email;
            list.appendChild(li);
        })
    }
})

scrapeEmails.addEventListener("click", async () => {
    // get current active tab
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    //execute script to parse emails on page
    chrome.scripting.executeScript({
        target: {tabId: tab.id}, 
        func: scrapeEmailsFromPage,
    });
})

//function to scrape emails
function scrapeEmailsFromPage(){
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
    //parse emails from html of page
    let emails = document.body.innerHTML.match(emailRegEx);

    chrome.runtime.sendMessage({emails});
}