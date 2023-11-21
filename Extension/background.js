chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'saveUrl' && request.url) {
      console.log('Received URL:', request.url);
      // Save the URL to storage or perform other actions
    }
  });