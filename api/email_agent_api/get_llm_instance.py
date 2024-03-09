from email_agent_api import env
from langchain.llms.ollama import Ollama
from langchain.llms.openai import OpenAI
from langchain.llms.base import BaseLLM


def get_llm_instance() -> BaseLLM:
    if env.LLM_ENDPOINT_TYPE == "OPENAI":
        return OpenAI(model_name=env.LLM_MODEL_NAME)
    elif env.LLM_ENDPOINT_TYPE == "OLLAMA":
        return Ollama(model=env.LLM_MODEL_NAME)

    raise ValueError(f"Invalid LLM_ENDPOINT_TYPE: {env.LLM_ENDPOINT_TYPE}")
