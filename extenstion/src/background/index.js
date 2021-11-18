import { FacebookProfilePicture } from "./facebook";
import { InstagramProfilePicture } from "./instagram";

chrome.contextMenus.create({
  title: "Unlock Profile Picture",
  contexts: ["all"],
  documentUrlPatterns: ["*://*.facebook.com/*"],
  onclick: () => FacebookProfilePicture(),
});

// chrome.contextMenus.create({
//   title: "Download Public Profile Photos",
//   contexts: ["all"],
//   documentUrlPatterns: ["*://*.facebook.com/*"],
//   onclick: () => FacebookProfilePhotos(),

// });


chrome.contextMenus.create({
  title: "Unlock Profile Picture",
  contexts: ["all"],
  documentUrlPatterns: ["*://*.instagram.com/*"],
  onclick: () => InstagramProfilePicture(),

});


// chrome.contextMenus.create({
//   title: "Download Account Media",
//   contexts: ["all"],
//   documentUrlPatterns: ["*://*.twitter.com/*"],
//   onclick: () => TwitterProfileMedia(),

// });
