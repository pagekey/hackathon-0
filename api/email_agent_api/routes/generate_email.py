from fastapi import APIRouter
from pydantic import BaseModel
from email_agent_api.get_llm_instance import get_llm_instance
from langchain.llms.base import BaseLLM
from email_agent_api.routes.example_emails import ALL_EMAILS

router = APIRouter()
llm_instance: BaseLLM = get_llm_instance()


class GenerationRequest(BaseModel):
    email: str


@router.post("/")
def generate_email() -> dict[str, str]:
    all_emails: str = "\n\n".join(ALL_EMAILS)
    user_email = "steve.grice@pagekey.com"
    system_prompt = """You you are an email generation service acting as {user_email}. Given a list of previous
    emails above in the thread along with the name of the person you are acting as, craft
    a response email in the same tone as sender's previous emails. You should sound like you are {user_email}
    Respond with only the email content and nothing else."""
    full_prompt: str = f"----Email Thread-----{all_emails}\n-----End Email Thread-----\n\n{system_prompt.format(user_email=user_email)}"
    response: str = llm_instance.invoke(full_prompt)

    return {"email": response}
