document.addEventListener('DOMContentLoaded', function() {
    console.log("Content script loaded on the page.");
  
    // Add an event listener to the "research-bank" button
    document.getElementById('research-bank').addEventListener('click', function() {
      // Get the current tab's URL using window.location.href
      const activeUrl = window.location.href;
  
      // Send a message to the background script with the URL
      chrome.runtime.sendMessage({ action: 'saveUrl', url: activeUrl });
    });
  });