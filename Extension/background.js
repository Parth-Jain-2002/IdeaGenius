let recent_url = "";
let user_id = "";

// Check if the user is logged in or not, if not redirect to login page
chrome.storage.sync.get(["user_id"], function (result) {
  user_id = result.user_id;
  console.log("Value currently is " + user_id);
  if (user_id == "" || user_id == undefined) {
    chrome.tabs.create({
      url: "http://localhost:5173/login",
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "user_logged_in") {
    user_id = request.user_id;
    console.log(user_id);
    chrome.storage.sync.set({ user_id: user_id }, function () {
      console.log("User id is set to " + user_id);
    });
  } else if (request.message === "user_not_logged_in") {
    console.log("User not logged in");
    if (
      recent_url != "http://localhost:5173/login" &&
      recent_url != "http://localhost:5173/register" &&
      recent_url.includes("localhost:5173")
    ) {
      chrome.tabs.create({
        url: "http://localhost:5173/login",
      });
    }
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    recent_url = tab.url;
  }
});

// Switching the tab
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    recent_url = tab.url;
  });
});

// Get the message from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (
    request.message === "clicked_research_bank" ||
    request.message === "clicked_summary" ||
    request.message === "clicked_insights" ||
    request.message === "clicked_deep_dive"
  ) {
    console.log("Clicked research bank");
    console.log(user_id);
    // Get request with url and user id to the server
    fetch("http://localhost:8000/url_test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        url: recent_url,
        action: request.message,
        userid: user_id,
      },
    }).then(() => {
      chrome.tabs.create({
        url: "http://localhost:5173/research",
      });
    });
  }
});
