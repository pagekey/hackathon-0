from fastapi import APIRouter
from email_agent_api.lib.payment import check_if_paid
from email_agent_api.lib.log import logger


router = APIRouter()


@router.get("/")
def get_user_status(email: str) -> dict[str, str]:
    if check_if_paid(email):
        return {"status": "paid"}
    else:
        return {"status": "unpaid"}
