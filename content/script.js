chrome.runtime.sendMessage({ type: 'getBlockedWebsites' }, (blockedWebsites) => {
    const blockedUrls = blockedWebsites || [];

    function matchesUrl(url, domain) {
        try {
          const urlObj = new URL(url);
          return urlObj.hostname.endsWith(domain);
        } catch (e) {
          return false;
        }
    }


    function removeUnwantedSearchResults() {
        const searchResults = document.querySelectorAll('div.g');
        searchResults?.forEach((result) => {
            const link = result.querySelector('a');
            console.log(link);
            if (link) {
                const url = link.href;
                for (const blockedUrl of blockedUrls) {
                    if (matchesUrl(url, blockedUrl)) {
                        // result.style.display = 'none';
                        result.innerHTML = `<div style="color: grey;">Removed by ResultRefiner</div>`;
                        break;
                    }
                }
            }
        });
    }


    const targetNode = document.getElementById("main");
    // if (targetNode) {
    //     observer.observe(targetNode, { attributes: false, childList: true, subtree: true });
    // }

    const callback = () => {
        observer.disconnect();
        removeUnwantedSearchResults();
        if (targetNode) {
            observer.observe(targetNode, { attributes: false, childList: true, subtree: true });
        }
    };

    const observer = new MutationObserver(callback);
    if (targetNode) {
        observer.observe(targetNode, { attributes: false, childList: true, subtree: true });
    }
    removeUnwantedSearchResults();
});