let current_url = "";
let research = document.getElementById("research-bank");
let summary = document.getElementById("summary");
let insights = document.getElementById("insights");
let deep_dive = document.getElementById("deep-dive");

research.addEventListener("click", function () {
  // Send a message to the background script
  chrome.runtime.sendMessage({
    message: "clicked_research_bank",
    user_id: localStorage.getItem("ideagen_user_id"),
  });
});

summary.addEventListener("click", function () {
  // Send a message to the background script
  chrome.runtime.sendMessage({
    message: "clicked_summary",
    user_id: localStorage.getItem("ideagen_user_id"),
  });
});

insights.addEventListener("click", function () {
  // Send a message to the background script
  chrome.runtime.sendMessage({
    message: "clicked_insights",
    user_id: localStorage.getItem("ideagen_user_id"),
  });
});

deep_dive.addEventListener("click", function () {
  // Send a message to the background script
  chrome.runtime.sendMessage({
    message: "clicked_deep_dive",
    user_id: localStorage.getItem("ideagen_user_id"),
  });
});
