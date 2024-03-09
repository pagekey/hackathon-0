from collections.abc import AsyncIterable
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from email_agent_api.get_llm_instance import get_llm_instance
from langchain.llms.base import BaseLLM
from email_agent_api.lib.get_llm_message_stream import get_llm_message_stream

router = APIRouter()
llm_instance: BaseLLM = get_llm_instance()

EMAIL_GENERATION_SYSTEM_PROMPT = """You you are an email generation service acting as {user_email}. Given a list of previous
emails above in the thread along with the name of the person you are acting as, craft
a response email in the same tone as sender's previous emails. You should sound like you are {user_email}
Respond with only the email body and nothing else."""

MOCK_USER_EMAIL = "steve.grice@pagekey.com"


@router.post("/")
async def generate_email(request: Request) -> dict[str, str]:
    all_emails = await request.body()

    formatted_system_prompt: str = EMAIL_GENERATION_SYSTEM_PROMPT.format(
        user_email=MOCK_USER_EMAIL
    )
    full_prompt: str = f"----Email Thread-----{all_emails}\n-----End Email Thread-----\n\n{formatted_system_prompt}"
    response: str = llm_instance.invoke(full_prompt, max_tokens=16385)
    return {
        "body": response
    }


@router.post("/stream")
async def generate_email_stream() -> StreamingResponse:
    all_emails: str = "\n\n".join(ALL_EMAILS)
    formatted_system_prompt: str = EMAIL_GENERATION_SYSTEM_PROMPT.format(
        user_email=MOCK_USER_EMAIL
    )
    full_prompt: str = f"----Email Thread-----{all_emails}\n-----End Email Thread-----\n\n{formatted_system_prompt}"
    generator: AsyncIterable[str] = get_llm_message_stream(llm_instance, full_prompt)
    return StreamingResponse(generator, media_type="text/event-stream")
