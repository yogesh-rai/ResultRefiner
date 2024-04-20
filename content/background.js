
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === 'getBlockedWebsites') {
        chrome.storage.sync.get('blockedWebsites', (data) => {
            sendResponse(data?.blockedWebsites || []);
        });
        return true;
    } else if (message?.type === 'saveBlockedWebsites') {
        chrome.storage.sync.set({ blockedWebsites: message?.blockedWebsites }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});
