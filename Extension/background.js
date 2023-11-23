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
    if( request.message === "clicked_research_bank" ) {
        // Open a new tab with the login page
        console.log("Current URL: " + recent_url);
    }
    else if (request.message === "clicked_summarize") {
        
    }
    else if(request.message === "clicked_insights") {
        
    }
    else if(request.message === "clicked_deep_dive"){
        
    }
});