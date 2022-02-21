// List of blocked TLDs
let blockedTLDs = [
  "ba",
  "bar",
  "bd",
  "best",
  "br",
  "buzz",
  "cam",
  "casa",
  "cc",
  "cf",
  "cn",
  "cyou",
  "fun",
  "gq",
  "host",
  "icu",
  "id",
  "in",
  "ir",
  "ke",
  "link",
  "lk",
  "ml",
  "ng",
  "np",
  "one",
  "pe",
  "pk",
  "quest",
  "rest",
  "ru",
  "sa",
  "sbs",
  "store",
  "su",
  "support",
  "surf",
  "th",
  "top",
  "tr",
  "tz",
  "uz",
  "vn",
  "website",
  "work",
  "xyz",
];

function onError(error) {
  console.log(error)
}

// Set the default list.
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({
    blockedTLDs: blockedTLDs
  });
});

// Retreive stored list.
browser.storage.local.get(data => {
  if (data.blockedTLDs) {
    blockedTLDs = data.blockedTLDs;
  }
});

// Monitor for changes to the blocked list
browser.storage.onChanged.addListener(changeData => {
  blockedTLDs = changeData.blockedTLDs.newValue;
});

function handleRequest(requestDetails) {
  // Grab the web address of the page to be visited
  const url = new URL(requestDetails.url);

  const hostname = new URL(requestDetails.url).hostname;

  // Determine if TLD is in the blocked list and cancel request if true
  if (blockedTLDs.indexOf(url.hostname.split(".").pop()) != -1) {
    browser.storage.local.set({ [hostname]: hostname });
    console.log(`TLD Blocked: ${url.host}`);
    return { cancel: true };
  }
}

// Listen for a request to a web address and pass to handleRequest function
browser.webRequest.onBeforeRequest.addListener(
  handleRequest,
  { urls: ["<all_urls>"] },
  ["blocking"]
);