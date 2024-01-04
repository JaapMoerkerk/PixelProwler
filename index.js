document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');

    chrome.storage.sync.get('enabled', function (data) {
        toggleButton.checked = data.enabled || false;
    });

    toggleButton.addEventListener('change', function () {
        const isEnabled = toggleButton.checked;
        chrome.storage.sync.set({ enabled: isEnabled });

        // Send a message to the background script to update the state
        chrome.runtime.sendMessage({ enabled: isEnabled });
    });
});
