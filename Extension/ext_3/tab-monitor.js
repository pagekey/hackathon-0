////////////////////////////////////////////////////////////////////////////
// https://developer.chrome.com/docs/extensions/reference/tabs/#more-samples


console.log('tab-monitor.js')


// -> creating new thread/peeling off main branch
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('onCreated: ' + tab.windowId + '.' + tab.id)
})
// -> closure means answer found, dead end, or pivot
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  console.log('onRemoved: ' + removeInfo.windowId + '.' + tabId + ' (isWindowClosing=' + removeInfo.isWindowClosing + ')')
})




// -> change views
// "A" tab being opened
// vs a new tab being opened
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('onActivated: ' + activeInfo.windowId + '.' + activeInfo.tabId)
})

// -> when an existing tab changes, need to capture url changes etc
// this gets messy, every redirect fires it
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (typeof changeInfo.url !== 'undefined') {
    console.log('onUpdated: ' + tab.windowId + '.' + tabId + ':' + tab.index + '(' + changeInfo.status + ')' + ';' + tab.url)
  }
  //  console.log('onUpdated: ' + tab.windowId + '.' + tabId + ':' + tab.index + '(' + changeInfo.status + ')' + ';' + tab.url)
  //console.log(tab.url)
  //console.log(changeInfo.status)  // loading -> complete -> ''
  //console.log('changeurl:(' + changeInfo.url + ')')
})

// organization operation
chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {
  console.log('onMoved: ' + moveInfo.windowId + '.' + tabId + ':' + moveInfo.fromIndex + '->' + moveInfo.toIndex)
})

// Fired when a tab is replaced with another tab
// "due to prerendering or instant"
// might as well capture, basically just a hop node, can filter on view
chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
  console.log('onReplaced: ' + addedTabId + '->' + removedTabId)
})


// fork operation
chrome.tabs.onDetached.addListener(function(tabId, detatchInfo) {
  console.log('onDetatched: ' + detatchInfo.oldWindowId + '.' + tabId + ':' + detatchInfo.oldPosition)
})
chrome.tabs.onAttached.addListener(function(tabId, attachInfo) {
  console.log('onAttached: ' + attachInfo.newWindowId + '.' + tabId + ':' + attachInfo.newPosition)
})
