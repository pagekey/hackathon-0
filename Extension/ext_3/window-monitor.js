///////////////////////////////////////////////////////////////////////////////
// https://developer.chrome.com/docs/extensions/reference/windows/#examples
console.log('window-monitor.js')

// ----------------------------------------------- WINDOWS
// chrome.windows.onCreated --> create branch
// chrome.windows.onRemoved --> close branch
// chrome.windows.onFocusChanged --> take last focus as parent node?
// https://developer.chrome.com/docs/extensions/reference/windows/#examples


// filters: windowTypes - default ['normal', 'popup']
chrome.windows.onCreated.addListener(function(window) {
  console.log('window.onCreated: ' + window.id)
})

// filters: windowTypes - default ['normal', 'popup']
chrome.windows.onRemoved.addListener(function(windowId) {
  console.log('window.onRemoved: ' + windowId)
})

// filters: windowTypes - default ['normal', 'popup']
chrome.windows.onFocusChanged.addListener(function(windowId) {
  console.log('window.onFocusChanged: ' + windowId)
})
