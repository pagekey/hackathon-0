import tiktoken
from collections.abc import AsyncIterable
from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from langchain.llms.base import BaseLLM
from langchain.text_splitter import TokenTextSplitter
from email_agent_api import env
from email_agent_api.get_llm_instance import get_llm_instance
from email_agent_api.lib.mailparser import parse_raw_emails
from email_agent_api.lib.get_llm_message_stream import get_llm_message_stream
from email_agent_api.lib.payment import check_if_paid

router = APIRouter()
llm_instance: BaseLLM = get_llm_instance()


EMAIL_GENERATION_SYSTEM_PROMPT = """You you are an email generation service acting as {user_email}. Given a list of previous
emails above in the thread along with the name of the person you are acting as, craft
a response email in the same tone as sender's previous emails. You should sound like you are {user_email}

Respond with only the email body and nothing else.
Use plain text except only.
Limit the email to 4,000 characters."""


class EmailRequest(BaseModel):
    email: str
    raw_emails: str


def get_full_prompt_from_raw_emails(raw_emails: str, user_email: str) -> str:
    all_emails: str = parse_raw_emails(raw_emails)
    formatted_system_prompt: str = EMAIL_GENERATION_SYSTEM_PROMPT.format(
        user_email=user_email
    )
    encoding: tiktoken.Encoding = tiktoken.encoding_for_model(env.LLM_MODEL_NAME)
    token_splitter = TokenTextSplitter(
        encoding_name=encoding.name,
        model_name=env.LLM_MODEL_NAME,
    )
    truncated_emails: str = token_splitter.split_text(all_emails)[-1]
    return f"----Email Thread-----{truncated_emails}\n-----End Email Thread-----\n\n{formatted_system_prompt}"


@router.post("/")
async def generate_email(request: EmailRequest) -> dict[str, str]:
    user_paid: bool = check_if_paid(request.email, use_cache=True)

    if not user_paid:
        return {"error": "Not paid"}

    full_prompt: str = get_full_prompt_from_raw_emails(
        request.raw_emails, request.email
    )
    response: str = llm_instance.invoke(full_prompt)
    return {"body": response}


@router.post("/stream", response_model=None)
async def generate_email_stream(request: EmailRequest) -> StreamingResponse | dict:
    user_paid: bool = check_if_paid(request.email, use_cache=True)

    if not user_paid:
        return {"error": "Not paid"}

    full_prompt: str = get_full_prompt_from_raw_emails(
        request.raw_emails, request.email
    )
    generator: AsyncIterable[str] = get_llm_message_stream(llm_instance, full_prompt)
    return StreamingResponse(generator, media_type="text/event-stream")
