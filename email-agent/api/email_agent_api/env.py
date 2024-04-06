import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY: str = os.environ["OPENAI_API_KEY"]
LLM_ENDPOINT_TYPE: str = os.environ.get("LLM_ENDPOINT_TYPE", "OPENAI")
LLM_MODEL_NAME: str = os.environ.get("LLM_MODEL_NAME", "gpt-3.5-turbo-0125")
STRIPE_SECRET_KEY: str = os.environ["STRIPE_SECRET_KEY"]
STRIPE_PRICE_ID: str = os.environ['STRIPE_PRICE_ID']
STRIPE_CHECKOUT_URL: str = os.environ['STRIPE_CHECKOUT_URL']
CHROME_EXTENSION_ID: str = os.environ['CHROME_EXTENSION_ID']
