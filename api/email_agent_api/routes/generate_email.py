import tiktoken
from collections.abc import AsyncIterable
from fastapi import APIRouter, Request
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from langchain.llms.base import BaseLLM
from langchain.text_splitter import TokenTextSplitter
from email_agent_api.get_llm_instance import get_llm_instance
from email_agent_api.lib.mailparser import parse_raw_emails
from email_agent_api.lib.get_llm_message_stream import get_llm_message_stream

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


@router.post("/")
async def generate_email(request: EmailRequest) -> dict[str, str]:
    all_emails = parse_raw_emails(request.raw_emails)

    formatted_system_prompt: str = EMAIL_GENERATION_SYSTEM_PROMPT.format(
        user_email=request.email
    )
    full_prompt: str = f"----Email Thread-----{all_emails}\n-----End Email Thread-----\n\n{formatted_system_prompt}"

    token_splitter = TokenTextSplitter(
        encoding_name=tiktoken.encoding_for_model(llm_instance.model_name),
        model_name=llm_instance.model_name
    )
    partial_prompt = token_splitter.split_text(full_prompt)[-1]

    response: str = llm_instance.invoke(partial_prompt)

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
