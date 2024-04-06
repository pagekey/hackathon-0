console.log('content.js');

const API_URL = 'http://0.0.0.0:8000';
const gmail = new Gmail();

gmail.observe.on('compose', (compose, type) => {
    gmail.tools.add_compose_button(compose.$el, 'Generate Response', async () => {
        var emailDom = gmail.dom.email(gmail.get.email_id());
        const source = emailDom.source();

        const res = await fetch(API_URL + '/api/generate/', {
            method: 'POST',
            body: source,
        });

        const email = await res.json();
        const body = email.body;

        emailDom.body(body);
    });
});
