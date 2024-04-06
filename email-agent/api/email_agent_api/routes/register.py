from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def register_user() -> dict[str, str]:
    return {"token": "some-api-token"}
