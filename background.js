// background.js

let isEnabled = false;

chrome.runtime.onMessage.addListener(function (request) {
    if (request.enabled !== undefined) {
        isEnabled = request.enabled;
        updateContextMenu();
    }
});

function updateContextMenu() {
    chrome.contextMenus.removeAll();

    if (isEnabled) {
        chrome.contextMenus.create({
            title: "Search Image on Google using PixelProwler",
            contexts: ["image"],
            onclick: searchImage
        });
    }
}

function searchImage(info, tab) {
    const imageUrl = info.srcUrl;
    const searchUrl = `https://www.google.com/searchbyimage?image_url=${encodeURIComponent(imageUrl)}`;
    chrome.tabs.create({ url: searchUrl });
}

// Initialize context menu
updateContextMenu();
