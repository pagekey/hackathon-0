from typing import Optional
import requests


def get_email_from_token(token: str) -> Optional[str]:
    user_info = requests.get(
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&fields=email',
        headers={
            'Authorization': 'Bearer ' + token,
        }
    )

    if user_info.status_code != 200:
        return None

    json = user_info.json()

    if 'email' not in json:
        return None

    return json['email']
