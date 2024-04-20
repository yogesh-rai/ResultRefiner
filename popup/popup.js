document.addEventListener('DOMContentLoaded', () => {
    const websiteInput = document.getElementById('websiteInput');
    const addButton = document.getElementById('addButton');
    const removeallButton = document.getElementById('removeall');
    const blockedWebsitesList = document.getElementById('blockedWebsitesList');


    chrome.runtime.sendMessage({ type: 'getBlockedWebsites' }, (blockedWebsites) => {
        blockedWebsites.forEach(website => addWebsiteToList(website));
    });


    addButton.addEventListener('click', () => {
        const website = websiteInput.value.trim();
        if (website) {
            addWebsiteToList(website);
            saveBlockedWebsites();
            websiteInput.value = '';
        }
    });

    removeallButton.addEventListener('click', () => {
        chrome.storage.sync.remove('blockedWebsites', () => {
            console.log('All blocked websites removed.');
        });
        blockedWebsitesList.innerHTML = '';
    });


    function addWebsiteToList(website) {
        const listItem = document.createElement('li');

        listItem.classList.add('badge', 'bg-purple-light-2', 'c-pointer', 'bg-hover-red-light-2', 'fw-bold');
        listItem.style.padding = "0.4rem 0.8rem";
        listItem.style.margin = "0.25rem 0.125rem";

        listItem.textContent = website;
        listItem.addEventListener('click', () => {
            listItem.remove();
            saveBlockedWebsites();
        });
        blockedWebsitesList.appendChild(listItem);
    }


    function saveBlockedWebsites() {
        const blockedWebsites = Array.from(blockedWebsitesList.children).map(li => li.textContent);
        // console.log(blockedWebsitesList);
        // console.log(blockedWebsites);
        chrome.runtime.sendMessage({ type: 'saveBlockedWebsites', blockedWebsites });
    }
});
