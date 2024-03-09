console.log("popup.js");

const API_URL = 'http://0.0.0.0:8000';

// Handlers

const onLoad = async () => {
  await handleAuthCheck();
};

const handleAuthCheck = async () => {
  const res = await fetch(API_URL + '/api/user/', {
    email: 'test@test.com',
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

