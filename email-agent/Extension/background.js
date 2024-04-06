const API_URL = 'http://0.0.0.0:8000';

const hasPurchased = async (sendResponse) => {
  try {
    const auth = await chrome.identity.getAuthToken({
      interactive: true
    });

    const res = await fetch(API_URL + '/api/user/?token=' + auth.token);
    const status = await res.json();

    sendResponse(status.active);
  } catch (e) {
    sendResponse(false);
    return;
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "hasPurchased") {
	hasPurchased(sendResponse);
  }

  return true;
});