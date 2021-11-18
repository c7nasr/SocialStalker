chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.image) {
    document.getElementById("photo").src = message.image;
    document.getElementById("download").onclick = function () {
      chrome.downloads.download({
        url: message.image,
        filename: message.username + ".png",
        saveAs: false,
      });
    };
    return true;
  }
});
