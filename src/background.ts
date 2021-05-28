chrome.storage.sync.get(["enabled"], ({ enabled }) => {
  if (typeof enabled === "undefined") enabled = true;
  if (enabled === true) {
    chrome.browserAction.setIcon({
      path: {
        "16": "icons/green_16.png",
        "32": "icons/green_32.png",
        "128": "icons/green_128.png",
      },
    });
  } else {
    chrome.browserAction.setIcon({
      path: {
        "16": "icons/gray_16.png",
        "32": "icons/gray_32.png",
        "128": "icons/gray_128.png",
      },
    });
  }
});
chrome.runtime.onInstalled.addListener((e) => {
  if ("install" === e.reason) {
    chrome.tabs.create({
      url: chrome.extension.getURL("install.html"),
    });
  }
});
