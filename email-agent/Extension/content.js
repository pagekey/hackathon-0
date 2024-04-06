console.log('content.js');

const API_URL = 'http://0.0.0.0:8000';
const gmail = new Gmail();

let purchased = true;

(async () => {
  chrome.runtime.sendMessage({ type: "hasPurchased" }, (response) => {
    purchased = response;
  });
})();

const redirectToStripe = async (email) => {
    const res = await fetch(API_URL + '/api/user/stripe/?email=' + encodeURIComponent(email));
    const stripe = await res.json();
    window.open(stripe.stripe_url, '_blank').focus();
};

gmail.observe.on('compose', (compose, type) => {
    if (!purchased) return;

    gmail.tools.add_compose_button(compose.$el, 'Generate Response', async () => {
        const from = document.querySelector('div[role="region"] img[jid]').getAttribute('jid');

        if (!purchased){
            await redirectToStripe(from);
            return;
        }

        const emailDom = gmail.dom.email(gmail.get.email_id());
        const source = emailDom.source();

        const res = await fetch(API_URL + '/api/generate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                raw_emails: source,
                email: from,
            }),
        });

        const email = await res.json();

        if (email.error) {
            await redirectToStripe(from);
            return;
        }

        const body = email.body;

        compose.body(body.replace(/\n/g, "<br />"))
    });
});
