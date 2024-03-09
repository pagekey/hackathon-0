from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_user_status() -> dict[str, str]:
    return {"status": "PAID"}
