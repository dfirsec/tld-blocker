browser.storage.local.get().then(function (result) {
  let results = [];
  // sort list
  results.sort(function (a, b) {
    return a.localeCompare(b);
  });

  for (const key of Object.keys(result)) {
    // skip the blockTLDs key
    let str = "blockedTLDs"
    if (!key.startsWith(str)) {
      results.push({ 'site': key });
    }
  }

  //  list up to 10 entries
  if (results.length > 11) {
    results = results.slice(0, 11);
  }

  for (let i = 0; i < 11; i++) {
    let line = document.getElementById('blocked_' + (i + 1));
    if (i < results.length & line !== null) {
      line.getElementsByClassName('domain')[0].textContent = results[i].site;
    }
  }
});