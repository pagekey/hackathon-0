from collections.abc import AsyncIterable
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from email_agent_api.get_llm_instance import get_llm_instance
from langchain.llms.base import BaseLLM
from email_agent_api.routes.example_emails import ALL_EMAILS
from email_agent_api.lib.get_llm_message_stream import get_llm_message_stream

router = APIRouter()
llm_instance: BaseLLM = get_llm_instance()

EMAIL_GENERATION_SYSTEM_PROMPT = """You you are an email generation service acting as {user_email}. Given a list of previous
emails above in the thread along with the name of the person you are acting as, craft
a response email in the same tone as sender's previous emails. You should sound like you are {user_email}
Respond with only the email content and nothing else."""


@router.post("/")
async def generate_email() -> dict[str, str]:
    all_emails: str = "\n\n".join(ALL_EMAILS)
    user_email = "steve.grice@pagekey.com"
    formatted_system_prompt: str = EMAIL_GENERATION_SYSTEM_PROMPT.format(
        user_email=user_email
    )
    full_prompt: str = f"----Email Thread-----{all_emails}\n-----End Email Thread-----\n\n{formatted_system_prompt}"
    response: str = llm_instance.invoke(full_prompt)
    return {"email": response}


@router.post("/stream")
async def generate_email_stream() -> StreamingResponse:
    all_emails: str = "\n\n".join(ALL_EMAILS)
    user_email = "steve.grice@pagekey.com"
    formatted_system_prompt: str = EMAIL_GENERATION_SYSTEM_PROMPT.format(
        user_email=user_email
    )
    full_prompt: str = f"----Email Thread-----{all_emails}\n-----End Email Thread-----\n\n{formatted_system_prompt}"
    generator: AsyncIterable[str] = get_llm_message_stream(llm_instance, full_prompt)
    return StreamingResponse(generator, media_type="text/event-stream")
