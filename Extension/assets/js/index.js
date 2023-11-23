// Check if the user is logged in or not, if not redirect to login page
if (localStorage.getItem("ideagen_logged_in") == "true") {
  // Open a new tab with the login page
    chrome.tabs.create({
        url: "http://localhost:5173/login"
    });
}

let research = document.getElementById("research-bank");
let summary = document.getElementById("summary");
let insights = document.getElementById("insights");
let deep_dive = document.getElementById("deep-dive");

research.addEventListener("click", function() {
  // Send a message to the background script
  chrome.runtime.sendMessage({message: "clicked_research_bank"});
})

summary.addEventListener("click", function() {
  // Send a message to the background script
  chrome.runtime.sendMessage({message: "clicked_summary"});
})

insights.addEventListener("click", function() {
  // Send a message to the background script
  chrome.runtime.sendMessage({message: "clicked_insights"});
})

deep_dive.addEventListener("click", function() {
  // Send a message to the background script
  chrome.runtime.sendMessage({message: "clicked_deep_dive"});
})