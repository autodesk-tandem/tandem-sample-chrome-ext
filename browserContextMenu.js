

function launchTandemWebSearch(info, tab) {
  console.log("TANDEM_EXT: info param", info);
  console.log("TANDEM_EXT: tab param", tab);

      // demonstrate how to send a message to the content script.  Doesn't do us any good
      // here because the content script does not have access to Tandem via DT_APP.  But,
      // preserving this bit of logic in case we need it in the future.
  chrome.tabs.sendMessage(tab.id, {question: "currentTime"}, function(response) {
    console.log("TANDEM_EXT: answer=", response.answer);
  });

    // lets just google search on "Autodesk TandemDB"
  chrome.tabs.create({
    url: "http://www.google.com/search?q=" + "Autodesk Tandem"
  });

}

console.log("TANDEM_EXT:", "adding browser context menu");

chrome.contextMenus.create({
  title: "Tandem Search: %s",
  contexts:["all"],
  onclick: launchTandemWebSearch
});
