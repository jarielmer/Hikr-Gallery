chrome.tabs.onUpdated.addListener(addHikrGalleryScript)
chrome.tabs.onActivated.addListener(addHikrGalleryScript)

function addHikrGalleryScript(_, _, tab_info) {
  test_tab(tab_info)
}

async function addHikrGalleryScriptAsync(activeInfo) {
  tab_info = await chrome.tabs.get(activeInfo.tabId);
  test_tab(tab_info)
}

function test_tab(tab_info){
  // console.log(tab_info)
  if(/^https:\/\/www\.hikr\.org\/tour\/.*\.html/.test(tab_info.url)) {
    chrome.scripting.insertCSS({target: {tabId: tab_info.id}, files: ['./foreground.css']})
    chrome.scripting.executeScript({target: {tabId: tab_info.id}, files: ['./foreground.js']})
  } 
}