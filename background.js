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
  "cloud",
  "cn",
  "cyou",
  "digital",
  "email",
  "finance",
  "fun",
  "gq",
  "host",
  "icu",
  "id",
  "in",
  "ir",
  "ke",
  "link",
  "live",
  "lk",
  "ml",
  "monster",
  "ng",
  "np",
  "one",
  "online",
  "pe",
  "pk",
  "quest",
  "rest",
  "ru",
  "sa",
  "sbs",
  "shop",
  "site",
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

// Set the default list.
browser.runtime.onInstalled.addListener(details => {
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

// Listen for a request to open a webpage and pass to handleRequest function
browser.webRequest.onBeforeRequest.addListener(
  handleRequest,
  { urls: ["<all_urls>"] },
  ["blocking"]
);

function handleRequest(requestDetails) {
  // Grab the web address of the page to be visited
  const url = new URL(requestDetails.url);

  // Determine if TLD is in the blocked list and cancel request if true
  if (blockedTLDs.indexOf(url.hostname.split(".").pop()) != -1) {
    return { cancel: true };
  }
}
