const blockedTLDsTextArea = document.querySelector("#blocked-tlds");

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  let blockedTLDs = blockedTLDsTextArea.value.split("\n");
  browser.storage.local.set({
    blockedTLDs
  });
}

// Update the options UI with the settings values retrieved from storage
function updateUI(restoredSettings) {
  blockedTLDsTextArea.value = restoredSettings.blockedTLDs.join("\n");
}

function onError(e) {
  console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
blockedTLDsTextArea.addEventListener("change", storeSettings);
