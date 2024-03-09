from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def generate_email() -> dict[str, str]:
    return {"email": "Hey Mr. Smith, here is your receipt"}
