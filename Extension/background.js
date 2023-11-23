let recent_url = "";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        recent_url = tab.url;
    }
});

// Switching the tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        recent_url = tab.url;
    });
});

// Get the message from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if( request.message === "clicked_research_bank" || request.message === "clicked_summarize" || request.message === "clicked_insights" || request.message === "clicked_deep_dive" ) {
        console.log("Clicked research bank")
        console.log(user_id)
        // Get request with url and user id to the server
        fetch("http://localhost:8000/url_test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "url": recent_url,
                "user_id": request.user_id,
                "action": request.message
            }
        })
    }
});