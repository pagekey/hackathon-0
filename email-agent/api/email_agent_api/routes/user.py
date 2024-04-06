from typing import Any
from fastapi import APIRouter
from email_agent_api.lib.oauth import get_email_from_token
from email_agent_api.lib.payment import check_if_paid, create_checkout_url, cancel_subscription
from email_agent_api import env

router = APIRouter()


@router.get("/")
def get_user_status(token: str) -> dict[str, bool]:
    email = get_email_from_token(token)

    return {
        "active": check_if_paid(email, use_cache=False),
    }

@router.get("/stripe/")
def get_user_stripe_url(token: str) -> dict[str, str]:
    email = get_email_from_token(token)

    return {
        "stripe_url": create_checkout_url(email) if email is not None else None,
    }

@router.post("/stripe/cancel/")
def post_user_stripe_cancel(token: str) -> dict[str, bool]:
    email = get_email_from_token(token)

    cancel_subscription(email)

    return {
        "active": False,
    }
