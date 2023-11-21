// Check if the user is logged in or not, if not redirect to login page
if (localStorage.getItem("ideagen_logged_in") == "true") {
  // Open a new tab with the login page
    chrome.tabs.create({
        url: "http://localhost:5173/login"
    });
}

let research = document.getElementById("research-bank");

// research.addEventListener("click", function() {
//   // Send the active tab url to the server
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log(tabs)
//   });
// })