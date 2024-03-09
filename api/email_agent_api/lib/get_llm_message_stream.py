from email_agent_api.lib.log import logger
from langchain.llms.base import BaseLLM
from collections.abc import AsyncIterable


async def get_llm_message_stream(
    llm_instance: BaseLLM,
    content: str,
) -> AsyncIterable[str]:
    """Given an LLM instance and the prompt, return a stream of tokens.

    Args:
        llm_instance: A LangChain LLM instance.
        prompt: The prompt to send to the LLM.

    Returns:
        A stream of tokens.

    Yields:
        A token at a time.
    """
    response_stream: AsyncIterable[str] = llm_instance.astream(content)

    try:
        async for token in response_stream:
            logger.info("Response token: %s" % token)
            yield f"data: {token}"
    except Exception as e:
        print(f"Caught exception: {e}")
