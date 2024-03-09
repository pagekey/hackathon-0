console.log('content.js');

const gmail = new Gmail();

gmail.observe.on('compose', (compose, type) => {
    gmail.tools.add_compose_button(compose.$el, 'Generate Response', () => {
        var emailDom = gmail.dom.email(gmail.get.email_id());
        const source = emailDom.source();
    });
});
