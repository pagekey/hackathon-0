import mailparser
from html.parser import HTMLParser


class HTMLFilter(HTMLParser):
    text = ""
    def handle_data(self, data):
        self.text += data


def parse_raw_emails(raw_mail: str):
    mail = mailparser.parse_from_string(raw_mail)
    html_filter = HTMLFilter()
    html_filter.feed(mail.message_as_string)
    return html_filter.text
