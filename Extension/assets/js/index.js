// Check if the user is logged in or not, if not redirect to login page
if (localStorage.getItem("ideagen_logged_in") == "true") {
  // Open a new tab with the login page
    chrome.tabs.create({
        url: "http://localhost:5173/login"
    });
}