// Not working yet

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if( request.message === "get_active_tab" ) {
//         console.log(window.location.href);
//         //sendResponse({message: "success", url: window.location.href});
//     }
// })

current_url = window.location.href;

if(current_url.includes("localhost:5173")) {
    console.log("Matched: " + current_url);
    if (localStorage.getItem("ideagen_logged_in") == "true") {
        // Open a new tab with the login page
        chrome.runtime.sendMessage({message: "user_logged_in", user_id: localStorage.getItem("ideagen_user_id")});
    }
    else {
        if(current_url != "http://localhost:5173/login" && current_url!= "http://localhost:5173/register") chrome.runtime.sendMessage({message: "user_not_logged_in"});
    }
}



