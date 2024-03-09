from fastapi import APIRouter
from openai import OpenAI
from email_agent_api import env

router = APIRouter()
openai_instance = OpenAI(api_key=env.OPENAI_API_KEY)


@router.post("/")
def generate_email() -> dict[str, str]:
    return {"email": "Hey Mr. Smith, here is your receipt"}
