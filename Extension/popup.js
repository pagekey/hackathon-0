const API_URL = 'http://0.0.0.0:8000';

// Handlers

const init = async () => {
  document.getElementById('oauth').classList.add('d-none');
  document.getElementById('purchase-status').classList.add('d-none');
  document.getElementById('authed').classList.add('d-none');
  document.getElementById('unauthed').classList.add('d-none');
  document.getElementById('purchase-spinner').classList.remove('d-none');

  try {
    await chrome.identity.getAuthToken({ interactive: false });
    await handleAuthCheck();
  } catch {
    await handleOAuth();
  }
};

const handleOAuthButton = () => {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    init();
  });
};

const handleOAuth = async () => {
  removeSpinner();

  document.getElementById('oauth').classList.remove('d-none');

  document.getElementById('oauth-button').addEventListener('click', handleOAuthButton, {
    once: true,
  });
};

const handleAuthCheck = async () => {
  const auth = await chrome.identity.getAuthToken({ interactive: false });

  document.getElementById('purchase-status').classList.remove('d-none');

  const res = await fetch(API_URL + '/api/user/?token=' + encodeURIComponent(auth.token));
  const status = await res.json();

  if (status.active) {
    handleAuthed();
  } else {
    handleUnauthed();
  }
};

const removeSpinner = async () => {
  const spinner = document.getElementById('purchase-spinner');
  spinner.classList.add('d-none');
};

const handleCancelPurchase = async () => {
  const auth = await chrome.identity.getAuthToken({ interactive: false });

  await fetch(API_URL + '/api/user/stripe/cancel/?token=' + encodeURIComponent(auth.token), {
    method: 'post',
  });

  await chrome.identity.clearAllCachedAuthTokens();

  init();
};

const handleAuthed = async () => {
  removeSpinner();
  document.getElementById('authed').classList.remove('d-none');

  document.getElementById('cancel-purchase').addEventListener('click', handleCancelPurchase, {
    once: true,
  });
};

const handleUnauthed = async () => {
  const auth = await chrome.identity.getAuthToken({ interactive: false });

  const res = await fetch(API_URL + '/api/user/stripe/?token=' + encodeURIComponent(auth.token));
  const stripe = await res.json();

  removeSpinner();
  document.getElementById('unauthed').classList.remove('d-none');

  document.getElementById('purchase').href = stripe.stripe_url;
};

// Event Listeners
window.addEventListener('DOMContentLoaded', init, false);
