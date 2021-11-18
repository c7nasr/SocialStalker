

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {

    if (message.current) {
      document.getElementById("photo").src = message.current;
      document.getElementById("status").innerHTML = message.status
    }

    if (message.media) {
      document.getElementById("status").innerHTML = "Operation is done. Click to download"

      document.getElementById("status").onclick = function () {
        window.open(message.media);
      };
      chrome.storage.sync.clear();
    }

    return true;
});
