const API_URL = 'http://0.0.0.0:8000';

// Handlers

const onLoad = async () => {
  await handleAuthCheck();
};

const getCurrentTabTitle = () =>
  new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0].title);
    });
  });

const getEmailFromString = (stringToCheck) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const match = stringToCheck.match(emailRegex);

  if (match) {
    return match[0];
  } else {
    return null;
  }
};

const getUserEmail = async () => {
  const tabTitle = await getCurrentTabTitle();
  return getEmailFromString(tabTitle);
};

const handleAuthCheck = async () => {
  const email = await getUserEmail();

  if (!email) {
    return;
  }

  const res = await fetch(API_URL + '/api/user/', {
    email,
  });

  const status = await res.json();

  if (status.active) {
    handleAuthed();
  } else {
    handleUnauthed(status.stripe_url);
  }
};

const removeSpinner = async () => {
  const spinner = document.getElementById('spinner');
  if (spinner) {
    spinner.remove();
  }
};

const handleAuthed = async () => {
    removeSpinner();
    document.getElementById('authed').classList.remove('d-none');
};

const handleUnauthed = async (stripe_url) => {
    removeSpinner();
    document.getElementById('unauthed').classList.remove('d-none');

    document.getElementById('purchase').href = stripe_url;
};

// Event Listeners
window.addEventListener('DOMContentLoaded', onLoad, false);

document.getElementById('purchase-refresh').addEventListener('click', async () => {
  await handleAuthCheck();
});
