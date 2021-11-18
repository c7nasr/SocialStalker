chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  chrome.storage.sync.get(["id"], function (result) {
    const id = result.id;
    if (message.id === id) {
      if (message.photo) {
        document.getElementById("photo").src = message.photo;
      }

      if (message.status) {
        document.getElementById("status").innerHTML = message.status;
      }
      if (message.download_link) {
        document.getElementById("status").onclick = function () {
          window.open(message.download_link);

        };
        chrome.storage.sync.clear()

      }


      return true;
    }
  });
});
