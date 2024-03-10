from typing import Any
from fastapi import APIRouter
from email_agent_api.lib.payment import check_if_paid
from email_agent_api import env

router = APIRouter()


@router.get("/")
def get_user_status(email: str) -> dict[str, Any]:
    if check_if_paid(email, use_cache=False):
        return {"active": True}
    else:
        return {"active": False, "stripe_url": env.STRIPE_CHECKOUT_URL}
