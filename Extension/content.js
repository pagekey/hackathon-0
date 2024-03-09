console.log('content.js');

const API_URL = 'http://0.0.0.0:8000';
const gmail = new Gmail();

gmail.observe.on('compose', (compose, type) => {
    gmail.tools.add_compose_button(compose.$el, 'Generate Response', async () => {
        const emailDom = gmail.dom.email(gmail.get.email_id());
        const source = emailDom.source();
        const from = document.querySelector('div[role="region"] img[jid]').getAttribute('jid');

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
        const body = email.body;

        compose.body(body.replace(/\n/g, "<br />"))
    });
});
