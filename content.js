console.log("TANDEM_EXT:", "loaded");

  // in order for our JS to have access to the proper page context and get access to the Viewer and other tandem
  // functions, we have to add our scripts to the actual page.  Otherwise, we are running in a different context
function injectJS(filename) {
    const script = document.createElement('script');
    script.src = chrome.extension.getURL(filename);
    document.head.appendChild(script);
}

  // demonstrate message passing between content script and background script.  See note in
  // browserContextMenu.js about how it doesn't really help us in this case.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("TANDEM_EXT:", sender.tab ?
                "message from a content script:" + sender.tab.url :
                "message from the extension");
    if (request.question === "currentTime") {
      sendResponse({answer: "get a watch!"});
    }
    else {
      sendResponse({answer: "I don't understand your quewtion!"});
    }
  }
);

// the content.js script in an extension loads when static HTML is done loading, but could be well before
// the page is fully loaded via JS code like REACT.  So, we have to delay loading via a simple timeout.
// TODO: add an event to Tandem to trigger this.
setTimeout( ()=> {
  injectJS("colorHeaderByOwner.js");
  injectJS("viewerContextMenu.js");
}, 5000);
